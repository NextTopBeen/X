import {NgModule} from '@angular/core';
import {WordCloudComponent} from './word-cloud/word-cloud.component';
import {WordCloudRoutingModule} from './word-cloud-routing.module';
import {CommonModule} from '@angular/common';
import {ArticleModule} from '../article/article.module';

@NgModule({
  imports: [
    CommonModule,
    ArticleModule,
    WordCloudRoutingModule
  ],
  exports: [
    WordCloudComponent
  ],
  declarations: [WordCloudComponent]
})
export class WordCloudModule {
}
