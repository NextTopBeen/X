## Service Worker 缓存

本文并不具体谈论Service Worker的原理，同时本文也不谈论什么是前端缓存。

但是如果两者结合起来，那就可以大做文章了。为应用（WEB）添加缓存有很多方式，但能够提供离线缓存的，就目前来说，应该仅仅只有
Service Worker这个技术可以做到。具体的表现形式在于，就跟原生APP一样，其最主要的特点就是提供了离线可用的机制。另外一点就是，
Service Worker是独立于当前JavaScript进程而执行的，它本身都是**离线可用的**，其相当于充当了应用和服务器之间的**代理服务器**。
这么一来也就"真相大白"：

简单的来说Service Worker的缓存原理便是在应用发起请求时进行拦截，查询是否缓存并按照一定逻辑选择是否将缓存的东西返回给应用

上面的"缓存的东西"远远比普通的缓存机制要强大，你能想到的诸如js，css，图片等静态资源，甚至还有来自服务端的数据（例如远端接口的JsonResponse）的是可以缓存的

所以抛开浏览器的兼容性而言（其实目前各大主流浏览器的较新版本以及三大OS的新版本都以支持PWA和Service Worker相关技术），Service Worker以及让其发挥强大作用的PWA（渐进式网页应用程序）可以说是目前WEB前端发展的一大趋势。就其缓存控制技术而言，Service Worker的缓存控制技术已经是前端数一数二的了。


## Angular与Service Worker缓存

事实上，如果你正在使用Angular当前最新的v6版本，你都应该去添加最新的Angular PWA支持，甚至不用进行什么具体的配置（例如就使用默认的配置），你的应用便已经可以离线可用了。
而且就算考虑到有老版本的浏览器用户存在导致PWA以及Service Worker不奏效，它们也不会干扰到你正常的业务逻辑，也正所谓"渐进式"的由来

```
 ng add @angular/pwa
```

上述短短的命令其实做了很多事情：

> * 把 @angular/service-worker 添加到你的项目中
> * 在Angular CLI中启用了Service Worker技术的构建支持
> * 在根模块中导入了Service Worker 模块
> * 修改了入口index.html文件，主要添加了到manifest.json文件的链接
> * 创建了默认的图标文件，用以支持安装PWA应用
> * 创建一个名叫 ngsw-config.json 的 Service Worker 配置文件，它会用来指定缓存的行为以及其它设定


那么就着重看下ngsw-config.json文件，如上所述，其控制了Angular中的Service Worker是如何进行缓存的，如下摘录的是本应用（你当前看到的）的缓存配置：

```json
{
  "index": "/index.html", 
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/*.css",
          "/*.js"
        ],
        "versionedFiles": [
          "/*.bundle.css",
          "/*.bundle.js",
          "/*.chunk.js"
        ],
        "urls": [
          "https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css",
          "https://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0"
        ]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**"
        ]
      }
    }
  ],
  "dataGroups": [
    {
      "name": "articles",
      "urls": ["**/*.md"],
      "cacheConfig": {
        "maxSize": 50,
        "maxAge": "2d",
        "timeout": "3s",
        "strategy": "freshness"
      }
    },
    {
      "name": "configData",
      "urls": ["https://raw.githubusercontent.com/Lurance/X/Articles/config.json", "https://api.github.com/repos/Lurance/X/contents/?ref=Articles"],
      "timeout": "4000",
      "cacheConfig": {
        "maxSize": 50,
        "maxAge": "2d",
        "timeout": "3s",
        "strategy": "freshness"
      }
    }
  ]
}

```

index配置项用来指定充当索引页的文件以满足导航请求，可以简单的理解为入口

下面的便可以分组来看：

> * assetGroups：资产（Assets）是与应用一起更新的应用版本的一部分。 它们可以包含从页面的同源地址加载的资源以及从 CDN 和其它外部 URL 加载的第三方资源

可以看到就如名字一样，Angular编译生成的静态资源全部都被缓存起来了。几个配置项最重要的几点：

### installMode

installMode决定了这些资源最初的缓存方式，它可以取如下两个值：
> *prefetch 告诉 Angular Service Worker 在缓存当前版本的应用时要获取每一个列出的资源。 这是个带宽密集型的模式，但可以确保这些资源在请求时可用，即使浏览器正处于离线状态。

> *lazy 不会预先缓存任何资源。相反，Angular Service Worker 只会缓存它收到请求的资源。 这是一种按需缓存模式。永远不会请求的资源也永远不会被缓存。 这对于像为不同分辨率提供的图片之类的资源很有用，那样 Service Worker 就只会为特定的屏幕和设备方向缓存正确的资源。

### updateMode
对于已经存在于缓存中的资源，updateMode 会决定在发现了新版本应用后的缓存行为。 自上一版本以来更改过的所有组中资源都会根据 updateMode 进行更新

> * prefetch 会告诉 Service Worker 立即下载并缓存更新过的资源。

> * lazy 告诉 Service Worker 不要缓存这些资源，而是先把它们看作未被请求的，等到它们再次被请求时才进行更新。 lazy 这个 updateMode 只有在 installMode 也同样是 lazy 时才有效。

那么什么叫发现新版本呢？

就如前文所说，Service Worker并不是在后台成天睡大觉，它会自己去按照一定的规则去fetch服务器看资源和本地缓存资源是否不同，如果不同就会判断这是一次更新

### resources

resources那么就是要缓存的东西了

> * files 列出了与 dist 目录中的文件相匹配的模式。它们可以是单个文件也可以是能匹配多个文件的类似 glob 的模式。

> * versionedFiles 和 files 相似，但是它用来对工件进行构建，这些工件已经在文件名中包含了一个散列，用于让其缓存失效。 如果 Angular Service Worker 能假定这些文件在文件名不变时其内容也不会变，那它就可以从某些方面优化这种操作。

> * urls 包括要在运行时进行匹配的 URL 和 URL 模式。 这些资源不是直接获取的，也没有内容散列，但它们会根据 HTTP 标头进行缓存。 这对于像 Google Fonts 服务这样的 CDN 非常有用。

versionedFiles 是版本控制文件，简单的来说就是每次build出来的带hash的静态资源，它和检查更新机制息息相关

同时也可以可以看到我在urls里面缓存了fontawesome


```typescript
interface AssetGroup {
  name: string;
  installMode?: 'prefetch' | 'lazy';
  updateMode?: 'prefetch' | 'lazy';
  resources: {
    files?: string[];
    versionedFiles?: string[];
    urls?: string[];
  };
}
```


> * dataGroups：与这些资产性（asset）资源不同，数据请求不会随应用一起版本化。 它们会根据手动配置的策略进行缓存，这些策略对 API 请求和所依赖的其它数据等情况会更有用



