import {Component, OnInit} from '@angular/core';
import {ArticleService, ConfigData} from '../service/article.service';
import {Article} from '../model/article';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  page = 1;
  partArticles: Article[] = [];

  constructor(public articleService: ArticleService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: {configData: ConfigData[]}) => {
        this.articleService.parseConfigFile(data.configData);
        this.getArticles(this.page);
      });
  }

  getArticles(page: number) {
    this.articleService.getArticles(page)
      .subscribe(data => this.partArticles = data);
  }

  nextPage() {
    this.getArticles(++this.page);
  }

  prePage() {
    this.getArticles(--this.page);
  }

  goTo(page: number) {
    this.getArticles(this.page = page);
  }

}
