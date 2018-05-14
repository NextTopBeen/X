import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ArticleListComponent} from './article-list/article-list.component';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import {ArticleResolver} from './service/article-resolver.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      configData: ArticleResolver
    }
  },
  {
    path: 'article',
    component: ArticleListComponent,
    resolve: {
      configData: ArticleResolver
    }
  },
  {
    path: 'article/:vid',
    component: ArticleDetailComponent,
    resolve: {
      configData: ArticleResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ArticleResolver
  ]
})
export class AppRoutingModule {
}
