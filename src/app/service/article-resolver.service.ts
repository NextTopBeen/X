import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ArticleService, ConfigData} from './article.service';
import {Observable, of} from 'rxjs';

@Injectable()
export class ArticleResolver implements Resolve<ConfigData[]> {

  constructor(private articleService: ArticleService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ConfigData[]> {
    if (this.articleService.configData.length === 0) {
      return this.articleService.getRawGithubContentAndConfigFile();
    } else {
      console.log(this.articleService.configData);
      return of(this.articleService.configData);
    }
  }
}
