import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArticleService} from './article.service';
import {SwPush} from '@angular/service-worker';

@Injectable()
export class StartService {

  constructor(private http: HttpClient, private articleService: ArticleService, private swp: SwPush) {
  }

  load(): Promise<any> {
    return this.articleService.getRawGithubContentAndConfigFile()
      .toPromise()
      .then(res => this.articleService.parseConfigFile(res))
      .catch((err: any) => {
        return Promise.resolve(null);
      });
  }
}
