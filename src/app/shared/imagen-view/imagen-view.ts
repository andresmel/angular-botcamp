import { Component } from '@angular/core';
import { EventEmitter,Output,Input } from '@angular/core';
@Component({
  selector: 'app-imagen-view',
  imports: [],
  templateUrl: './imagen-view.html',
  styleUrl: './imagen-view.css',
})
export class ImagenView {
  @Input() getdata:string="";
  @Output() closeData=new EventEmitter<any>();

  cerrar(){
    this.closeData.emit(false);
  }
}
