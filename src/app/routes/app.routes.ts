import { PublicLayout } from './../core/layouts/public-layout/public-layout';
import { Routes } from '@angular/router';
import { PrivateLayout } from '../core/layouts/private-layout/private-layout';

export const routes: Routes = [
  {
    path: "",
    component: PublicLayout,
    children: [
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
      },
      {
        path: "login",
        loadComponent: () =>
          import('../auth/pages/login/login').then(m => m.Login),
        title: "login"
      },
      {
        path: "recover",
        loadComponent: () =>
          import('../auth/pages/recover/recover').then(m => m.Recover),
        title: "recover"
      }
    ],

  },
  {
    path:"dashboard",
    component:PrivateLayout,
    children:[
      {
        path:"",
        redirectTo:"capture",
        pathMatch:"full"
      },
      {
        path:"capture",
        loadComponent:()=>import("../features/pages/capture/capture").then(m=>m.Capture),
        title:"capture"
      }
    ]
  }
];
