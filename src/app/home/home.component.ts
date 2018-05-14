import {Component, OnInit} from '@angular/core';
import {ArticleService, ConfigData} from '../service/article.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private articleService: ArticleService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: {configData: ConfigData[]}) => {
        this.articleService.parseConfigFile(data.configData);
      });
  }

}
