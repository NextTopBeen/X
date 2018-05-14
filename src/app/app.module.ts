import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ResumeModule} from './resume/resume.module';
import {ArticleModule} from './article/article.module';
import {MarkdownModule} from 'ngx-markdown';
import {StartService} from './service/start.service';

export function StartServiceFactory(startService: StartService): Function {
  return () => {
    return startService.load();
  };
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    ResumeModule,
    ArticleModule,
    AppRoutingModule,
    MarkdownModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    StartService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartServiceFactory,
      deps: [StartService],
      multi: true
    }
  ]
})
export class AppModule {
}
