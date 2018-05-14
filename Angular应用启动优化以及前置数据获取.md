## 前言

这个是由我的博客应用的相关问题引出来的东东

在[本博客](http://liangniang.xyz/article/main)这篇文章我就说，在本应用进入时便会通过Github的API获取文章以及文章以来的配置数据。
但是众所周知Github在国内还是比较慢的(ｰ ｰ;)，假如有个小迷妹（屁的小迷妹！）要来参观参观，那么就有可能有大量的白屏时间。（我写了个Resolver，在进入路由的时候用来获取数据，换句话说，如果数据获取不到，是不会进入这个路由的）

那么这是一个启动优化的问题，简单的来说，我想给我的应用在进入的时候弄出一个载入动画，当数据GET到路由成功进入就消失

那么给出几种方案：

### 方案一

在index.html里面的<app-root></app-root>标签内写上想要给用户看的东西。app-root是Angular应用启动后渲染组件的根挂载点，当其成功渲染（在我这里就是数据成功过去到了）就会自动移除其中的内容

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

