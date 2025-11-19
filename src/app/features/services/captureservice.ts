import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class Captureservice {
  private _http=inject(HttpClient);
  baseUrl="http://127.0.0.1:8000/detect-faces";
  baseUrlDos="http://127.0.0.1:8000/get-images";
  constructor(){}

  sendData(image:any){
      return this._http.post(this.baseUrl,{"image_base64":image});
  }

  getImages(){
    return this._http.get(this.baseUrlDos);
  }
}
