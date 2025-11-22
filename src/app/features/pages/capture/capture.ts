import { Component, ViewChild, ElementRef,inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Captureservice } from '../../services/captureservice';
import { ToastrService } from 'ngx-toastr';
import { Loading } from '../../../shared/loading/loading';
import { ImagenView } from '../../../shared/imagen-view/imagen-view';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-capture',
  imports: [CommonModule,Loading,ImagenView],
  templateUrl: './capture.html',
  styleUrl: './capture.css',
})
export class Capture {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  _route=inject(Router);
  stream!: MediaStream;
  captured: string | null = null;
  _captureService=inject(Captureservice);
  _toast=inject(ToastrService);
  listImages:any=[];
  load=signal(false);
  close=signal(false);
  imagen=signal("");
  activeCam=signal(false);
  // Activar la cámara

  constructor(){

  }

  ngOnInit(): void {
   let res=sessionStorage.getItem("validar")
     if(!res){
         this._route.navigate(["login"])
     }
  }

  async startCamera() {
    try {
      this.activeCam.set(true)
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }   // "environment" para cámara trasera
      });

      this.videoElement.nativeElement.srcObject = this.stream;
      this.videoElement.nativeElement.play();
    } catch (err) {
      this.activeCam.set(false)
      console.error('Error activando cámara', err);
    }
  }

  // Parar la cámara
  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.activeCam.set(false)
    }
  }

  // Tomar foto como imagen base64
  captureImage(): string {
    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL('image/png'); // base64
  }

  sendImage(){
     console.log(this.captured)

      this.load.set(true);
     this._captureService.sendData(this.captured).subscribe({
      next:(data)=>{
        console.log(data)
        this._toast.success("se guardo la imagen Correctamente")
      },
      error:(error)=>{
        console.log(error)
        this.load.set(false);
        this._toast.error("error en la imaagen al guardar")
      },
      complete:()=>{
        this.load.set(false);
        this.getImagesTable();
      }
     })
  }

  getImagesTable(){
    this.load.set(true)
     this._captureService.getImages().subscribe({
      next:(data)=>{
        console.log(data)
        this.listImages=data;
        this._toast.success("datos cargados")
      },
      error:(error)=>{
        this.load.set(false);
        this._toast.error("error al traer las imagenes")
      },
      complete:()=>{
         this.load.set(false);
      }
     })
  }
  showImages(item:any){
    this.close.set(true);
      this.imagen.set(item.imagen);
  }
  closeModal(data:boolean){
      this.close.set(data);
  }




  async exportToExcel() {
  const wb = new Workbook();
  const ws = wb.addWorksheet('Fotos');

  ws.columns = [
    { header: 'Id',    key: 'id',    width: 10 },
    { header: 'Fecha', key: 'fecha', width: 22 },
    { header: 'Imagen', key: 'img',  width: 15 },
    { header:'Descripcion', key:'description',width:20}
  ];

  for (const item of this.listImages) {
    const row = ws.addRow({
      id: item.id,
      fecha: new Date(item.created_at).toLocaleString(),
      description:item.descroption
    });

    // --- extrae extensión y base64 puro ---
    const m = /^data:(image\/(png|jpeg|jpg));base64,/.exec(item.imagen);
    const ext = (m?.[2] === 'jpg') ? 'jpeg' : (m?.[2] ?? 'png');
    const base64 = item.imagen.includes(',') ? item.imagen.split(',')[1] : item.imagen;

    // --- agrega la imagen usando base64 (NO buffer) ---
    const imageId = wb.addImage({
      base64: base64,
      extension: ext as 'png' | 'jpeg'
    });

    // Columna C es índice 2 (0-based). 45x45 px
    ws.addImage(imageId, {
      tl:  { col: 2, row: row.number - 1 },
      ext: { width: 45, height: 45 }
    });

    // Ajusta altura de la fila (puntos)
    ws.getRow(row.number).height = 35;
  }

  const buf = await wb.xlsx.writeBuffer();
  saveAs(new Blob([buf]), 'imagenes.xlsx');

  }
}
