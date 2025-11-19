import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderPrivate } from '../../../shared/header-private/header-private';

@Component({
  selector: 'app-private-layout',
  imports: [RouterOutlet,HeaderPrivate],
  templateUrl: './private-layout.html',
  styleUrl: './private-layout.css',
})
export class PrivateLayout {

}
