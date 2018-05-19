import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WordCloudComponent} from './word-cloud/word-cloud.component';

const wordCloudRoutes: Routes = [
  {
    path: 'wordcloud',
    component: WordCloudComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(wordCloudRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WordCloudRoutingModule {
}
