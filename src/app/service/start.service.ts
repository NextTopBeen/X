import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArticleService} from './article.service';

@Injectable()
export class StartService {

  constructor(private http: HttpClient, private articleService: ArticleService) {
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
