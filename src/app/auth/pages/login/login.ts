import { Component, inject } from '@angular/core';
import { Form } from '../../components/form/form';
import { LoginService } from '../../services/loginService';
import {ToastrService} from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Form,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
_http=inject(LoginService);
_route=inject(Router);
_toast=inject(ToastrService);


constructor(){

}

authLogin(authuser:any){

  console.log(authuser)
  if(authuser){
       let res=this._http.getLogin(authuser);
       if(res){
        this._toast.success("correct info")
        this._route.navigate(["dashboard"]);
       }else{
       this._toast.error("error de credenciales");
       }
  }else{
       this._toast.error("error de credenciales");
  }

}
}
