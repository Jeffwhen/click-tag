
Click Tag Frontend
==================

### Developement

```shell
npm start # start dev server
npm run-script server # start api server
npm run-script lint # eslint
npm build
```

### Server API

Request looks like:

```json
{
  "index":1,
  "points":{
    "left-top":{
      "x":0.40237083333333,
      "y":0.55801666666667
    },
    "right-top":{
      "x":0.46483411458333335,
      "y":0.5575555555555556
    },
    "left-bottom":{
      "x":0.4048674479166666,
      "y":0.5830666666666667
    },
    "right-bottom":{
      "x":0.46343411458333333,
      "y":0.5808888888888889
    }
  }
}
```

`points` 键是可选参数。Server 应当根据 `points` 键是否存在来判断这是一个提交操作还是数据请求操作。

* 对于提交操作，应该为浏览器分配下一单元并返回新的 `index` 和 `total` 值
* 对于数据请求操作，返回请求 `index` 对应的单元

Response looks like:

```json
{
  "errcode":0,
  "url":"http://img.adkalava.com/img006/762/d44e27b14839539a.jpg",
  "box":{
    "xmax":0.82791598341921,
    "uid":8284982,
    "ymin":0.74945606694561,
    "xmin":0.78886437951405,
    "ymax":0.77333271746561
  },
  "imgId":"15298208626598564762",
  "width":2448,
  "height":2048,
  "points":[
    {
      "name":"左上",
      "key":"left-top",
      "x":0.78886437951405,
      "y":0.74945606694561
    },
    {
      "name":"右上",
      "key":"right-top"
    },
    {
      "name":"左下",
      "key":"left-bottom"
    },
    {
      "name":"右下",
      "key":"right-bottom"
    }
  ],
  "total":13,
  "index":2
}
```
