import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
user:any;


constructor(){
   this.user={
      email:"admin@gmail.com",
      password:"admin891011"
   }
}

getLogin(userLogin:any){
  if(userLogin?.email==this.user?.email && userLogin?.password==this.user?.password){
     return true;
  }else{
    return false;
  }
}

}
