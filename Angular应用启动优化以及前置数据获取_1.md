## 前言

这个是由我的博客应用的相关问题引出来的东东

在[本博客](http://liangniang.xyz/article/main)这篇文章我就说，在本应用进入时便会通过Github的API获取文章以及文章以来的配置数据。
但是众所周知Github在国内还是比较慢的(ｰ ｰ;)，假如有个小迷妹（屁的小迷妹！）要来参观参观，那么就有可能有大量的白屏时间。（我写了个Resolver，在进入路由的时候用来获取数据，换句话说，如果数据获取不到，是不会进入这个路由的）

那么这是一个启动优化的问题，简单的来说，我想给我的应用在进入的时候弄出一个载入动画，当数据GET到路由成功进入就消失

那么给出几种方案：

### 方案一

在index.html里面的<app-root></app-root>标签内写上想要给用户看的东西。app-root是Angular应用启动后渲染组件的根挂载点，当其成功渲染（在我这里就是数据成功获取到了）就会自动移除其中的内容

```html
<app-root>
<div class="preloader" id="preloader">
  <div class="cs-loader">
    <div class="cs-loader-inner">
      <label>	●</label>
      <label>	●</label>
      <label>	●</label>
      <label>	●</label>
      <label>	●</label>
      <label>	●</label>
    </div>
  </div>
</div>
</app-root>

```

我就是用的这种方法，实际的效果如图：


![](https://raw.githubusercontent.com/Lurance/X/Articles/imgs/Gif_20180514_200450.gif)


### 方案二

第二种和第一种差不多，它可以将内容写在index.html的任何其他地方，然后在应用成功启动后删除，那么怎么去除呢？

定位到main.ts文件，一般长这样：

```typescript
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
```

其实```bootstrapModule(AppModule)```这个代码返回的是一个Promise，那么通过then方法可以在应用成功启动后做其它的事情，操作原始的index.html的DOM自然不在话下


## Angular中的APP_INITIALIZER

APP_INITIALIZER 是一个函数，在应用程序初始化时被调用。这就意味着可以通过 AppModule 类的 providers 以 factory 的形式配置它来使用，同时应用程序将会等待它加载完成后进行下一步

简单了重构了下这个博客，将我以前Resolver的写法用这个重写了，毕竟之前那个有比较多的重复代码，因为考虑到可能有人这是直接点文章或者点文章列表的链接进入应用的，那么就需要给每个路由加上同样的Resolver，还要在组件类里面写几乎相同的处理代码逻辑。

事实上，利用这个API可以在应用初始化的时候就执行这个Resolver的相关逻辑，和全局路由的进入钩子比较像

### 用法

以我的代码示例

首先写个StartService：

```typescript
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

```

其中的load方法一定要返回一个Promise。在这里我依赖注入实例化了一个HttpClient用于发起请求。做的事情就是预先通过Github API取得所有的文章以及配置数据，并解析


在app.module.ts中首先需要写一个工厂函数：

```typescript
export function StartServiceFactory(startService: StartService): Function {
  return () => {
    return startService.load();
  };
}
```

用来返回StartService的load方法

然后通过 AppModule 类的 providers 以 factory 的形式配置它来使用

```typescript
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
```

## DONE

勇于重构！

很多时候，实现了功能并不是最终目的（或者说远远没有结束），如何更好的实现，更加优秀的代码设计模式，高质量的代码等等才是我们最终想要追求的
