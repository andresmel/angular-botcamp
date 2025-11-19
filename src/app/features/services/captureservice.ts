import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class Captureservice {
  private _http=inject(HttpClient);
  baseUrl="https://python-botcamp-api.onrender.com/detect-faces";
  baseUrlDos="https://python-botcamp-api.onrender.com/get-images";
  constructor(){}

  sendData(image:any){
      return this._http.post(this.baseUrl,{"image_base64":image});
  }

  getImages(){
    return this._http.get(this.baseUrlDos);
  }
}
