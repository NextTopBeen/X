import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';

const resumeRoutes: Routes = [
  {
    path: 'resume',
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(resumeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ResumeRoutingModule {
}
