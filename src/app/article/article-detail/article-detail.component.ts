import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ArticleService} from '../../service/article.service';
import {Observable} from 'rxjs';
import {Article} from '../../model/article';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article$: Observable<Article>;
  adjacentArticles$: Observable<Article[]>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private articleService: ArticleService) {
  }

  ngOnInit() {
    this.article$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.articleService.getArticle(params.get('vid')))
    );
    this.adjacentArticles$ = this.article$.pipe(
      switchMap(art => this.articleService.getAdjacent(art))
    );
  }

}
