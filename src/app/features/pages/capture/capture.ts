import { Component, ViewChild, ElementRef,inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Captureservice } from '../../services/captureservice';
import { ToastrService } from 'ngx-toastr';
import { Loading } from '../../../shared/loading/loading';
import { ImagenView } from '../../../shared/imagen-view/imagen-view';

@Component({
  selector: 'app-capture',
  imports: [CommonModule,Loading,ImagenView],
  templateUrl: './capture.html',
  styleUrl: './capture.css',
})
export class Capture {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

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
}
