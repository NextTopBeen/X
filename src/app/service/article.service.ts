import {Injectable} from '@angular/core';
import {Article} from '../model/article';
import {HttpClient} from '@angular/common/http';
import {mergeMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

interface GithubContentApi {
  name: string;
  path: string;
  sha: string;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _link: {
    self: string;
    git: string;
    htmL: string;
  };
}

export interface ConfigData {
  filename: string;
  title: string;
  createdAt: number;
  tags: string[];
}

@Injectable()
export class ArticleService {
  private articlesContentApiUrl = 'https://api.github.com/repos/Lurance/X/contents/?ref=Articles';
  private configFileUrl = 'https://raw.githubusercontent.com/Lurance/X/Articles/config.json';
  itemNumber = 12;
  configData: ConfigData[] = [];
  articles: Article[] = [];

  constructor(private http: HttpClient) {
  }

  getRawGithubContentAndConfigFile(): Observable<ConfigData[]> {
    return this.http.get<GithubContentApi[]>(this.articlesContentApiUrl)
      .pipe(
        mergeMap(data => {
          this.parseGithubContentApiData(data);
          return this.http.get<ConfigData[]>(this.configFileUrl);
        })
      );
      // .subscribe(data => this.parseConfigFile(data));
  }

  private parseGithubContentApiData(data: GithubContentApi[]) {
    data
      .filter(v => v.name.match(/(.+)\.md$/) != null)
      .forEach((value, index) => {
        this.articles.push({
          id: index,
          verboseId: value.name.match(/(.+)\.md$/)[1],
          url: value.download_url,
          filename: value.name
        });
      });
  }

  public parseConfigFile(data: ConfigData[]) {
    this.configData = data;
    data.forEach(v => {
      const art = this.articles.find(a => a.filename === v.filename);
      art.createdAt = v.createdAt;
      art.title = v.title;
      art.tags = v.tags;
    });
    console.log(this.articles);
  }

  getArticles(page: number = 1): Observable<Article[]> {
    return of(this.articles.slice((page - 1) * this.itemNumber, page * this.itemNumber).reverse());
  }

  getArticle(vid: string): Observable<Article> {
    return of(this.articles.find(v => v.verboseId === vid || v.id.toString() === vid));
  }

  getPageNumlist(): number[] {
    return Array.from(Array(Math.floor(this.articles.length / this.itemNumber) + 1).keys()).map(v => v + 1);
  }

  getAdjacent(article: Article) {
    const pre = this.articles.find(v => v.id === article.id - 1);
    const next = this.articles.find(v => v.id === article.id + 1);
    return of([pre, next].filter(v => v !== undefined));
  }
}
