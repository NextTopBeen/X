import {NgModule} from '@angular/core';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import {ArticleListComponent} from './article-list/article-list.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {MarkdownModule} from 'ngx-markdown';
import {ArticleRoutingModule} from './article-routing.module';
import {MatMenuModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MarkdownModule.forChild(),
    BrowserAnimationsModule,
    ArticleRoutingModule,
    MatMenuModule,
    HttpClientModule
  ],
  declarations: [
    ArticleDetailComponent,
    ArticleListComponent,
    FooterComponent,
    HomeComponent,
    NavBarComponent
  ],
  exports: [
    NavBarComponent,
    FooterComponent
  ]
})
export class ArticleModule {
}
