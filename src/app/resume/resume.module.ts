import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {ResumeRoutingModule} from './resume-routing.module';
import {ArticleModule} from '../article/article.module';

@NgModule({
  imports: [
    ResumeRoutingModule,
    ArticleModule
  ],
  declarations: [HomeComponent]
})
export class ResumeModule {
}
