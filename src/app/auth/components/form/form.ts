import { Component } from '@angular/core';
import {FormBuilder ,Validators, ReactiveFormsModule, FormGroup} from "@angular/forms"
import {inject } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-form',
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',

})
export class Form {
private _fb=inject(FormBuilder);
@Output() sendata=new EventEmitter<any>();

formData=this._fb.group({
  "email":["",[Validators.required]],
  "password":["",[Validators.required]]
});

sendLogin(){
  if(this.formData.valid){
      this.sendata.emit(this.formData.value);
    }
}


}
