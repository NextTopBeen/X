import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {ArticleListComponent} from './article-list/article-list.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {ArticleService} from './service/article.service';
import {FooterComponent} from './footer/footer.component';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import {MarkdownModule} from 'ngx-markdown';
import {HttpClientModule} from '@angular/common/http';
import {MatMenuModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticleListComponent,
    NavBarComponent,
    FooterComponent,
    ArticleDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    AppRoutingModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    MatMenuModule
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
