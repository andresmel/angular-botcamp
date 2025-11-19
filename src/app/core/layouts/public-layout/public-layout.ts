import { Component } from '@angular/core';
import { Login } from '../../../auth/pages/login/login';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../../shared/header/header';

@Component({
  selector: 'app-public-layout',
  imports: [Login,RouterOutlet,Header],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class PublicLayout {

}
