import {Component, Input, OnInit} from '@angular/core';

import * as WordCloud from 'wordcloud';
import {ListEntry} from 'wordcloud';
import {ArticleService, ConfigData} from '../../service/article.service';


@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})
export class WordCloudComponent implements OnInit {
  @Input()
  list: ListEntry[] = [];


  constructor(private articleService: ArticleService) {
  }

  ngOnInit() {
    this.parseConfigDataToWordCloudList(this.articleService.configData);
    this.createWordCloud();
  }

  parseConfigDataToWordCloudList(data: ConfigData[]): void {
    const list = [];
    data.forEach(v => {
      v.tags.forEach(n => {
        if (list.findIndex(l => l[0] === n) < 0) {
          list.push([n, 1]);
        } else {
          list[list.findIndex(l => l[0] === n)][1] ++;
        }
      });
    });

    this.list = list;
  }

  createWordCloud() {
    WordCloud(document.getElementById('my_canvas'), {
      gridSize: 2,
      weightFactor: 40,
      fontFamily: 'Finger Paint, cursive, sans-serif',
      color: 'random-dark',
      backgroundColor: '#ffffff',
      list: this.list,
    });
  }

}
