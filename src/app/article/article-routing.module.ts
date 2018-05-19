import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ArticleListComponent} from './article-list/article-list.component';
import {ArticleDetailComponent} from './article-detail/article-detail.component';

const articleRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'article',
    component: ArticleListComponent,
  },
  {
    path: 'article/:vid',
    component: ArticleDetailComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(articleRoutes)
  ],
  exports: [
    RouterModule
  ],
})
export class ArticleRoutingModule {
}
