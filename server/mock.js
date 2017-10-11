'use strict';

var port = normalizePort(process.env.PORT || 7334);
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Max-Age", 86400);
  next();
});
app.get('/image', (req, res) => {
  res.json(genImage());
});
app.post('/image', (...args) => {
  setTimeout(() => handler(...args), 100);
});

const handler = (req, res) => {
  if (req.body.points) {
    console.dir(req.body);
    if (req.body.index + 1 < data.length) {
      res.json(genImage(req.body.index + 1));
    } else {
      res.json({errcode: 1, msg: 'the end'});
    }
  } else {
    res.json(genImage(req.body.index));
  }
}
app.listen(port, function () {
  console.log(`api server @${port}`);
});

function genImage(index) {
  let img = data[index];
  let points = [
    {name: '左上', key: 'left-top', x: img.box.xmin, y: img.box.ymin},
    {name: '右上', key: 'right-top'},
    {name: '左下', key: 'left-bottom'},
    {name: '右下', key: 'right-bottom'}
  ];
  return {...img, ...respTemp, points, total: data.length, index};
}
let respTemp = {
  errcode: 0,
  description: 'description text'
};
let dataIndex = 0;
let data = [
  { url: 'http://img.adkalava.com/img006/327/a8af0a2e1ad2d9af.jpg',
    box: 
         { xmax: 0.43279600140681,
           uid: 8287479,
           ymin: 0.69725989583333,
           xmin: 0.34808690831372,
           ymax: 0.73747322916667 },
    imgId: '12154945112431057327',
    width: 1600,
    height: 1200 },
  { url: 'http://img.adkalava.com/img006/178/10475a032ff8ddf2.jpg',
    box: 
         { xmax: 0.46590549998359,
           uid: 8286803,
           ymin: 0.55801666666667,
           xmin: 0.40237083333333,
           ymax: 0.58233683251396 },
    imgId: '1173005197689544178',
    width: 1600,
    height: 1200 },
  { url: 'http://img.adkalava.com/img006/762/d44e27b14839539a.jpg',
    box: 
         { xmax: 0.82791598341921,
           uid: 8284982,
           ymin: 0.74945606694561,
           xmin: 0.78886437951405,
           ymax: 0.77333271746561 },
    imgId: '15298208626598564762',
    width: 2448,
    height: 2048 },
  { url: 'http://img.adkalava.com/img006/050/680b9ac2f74e6b0a.jpg',
    box: 
         { xmax: 0.61161250423396,
           uid: 8287110,
           ymin: 0.69077037443694,
           xmin: 0.52162226058491,
           ymax: 0.73544352759009 },
    imgId: '7497256166851767050',
    width: 1600,
    height: 1200 },
  { url: 'http://img.adkalava.com/img006/410/701b19a03b880d8a.jpg',
    box: 
         { xmax: 0.54998125,
           uid: 8286705,
           ymin: 0.5567,
           xmin: 0.47248125,
           ymax: 0.59391900769724 },
    imgId: '8078078532603350410',
    width: 1600,
    height: 1200 },
  { url: 'http://img.adkalava.com/img006/585/81b805c6b375f341.jpg',
    box: 
         { xmax: 0.487440625,
           uid: 8286248,
           ymin: 0.92438541666667,
           xmin: 0.397440625,
           ymax: 0.96105208333333 },
    imgId: '9347227377579979585',
    width: 1600,
    height: 1200 },
  { url: 'http://img.adkalava.com/img006/519/be1e656c9d4773f7.jpg',
    box: 
         { xmax: 0.63610290517628,
           uid: 8286206,
           ymin: 0.85590208333333,
           xmin: 0.544340625,
           ymax: 0.89562287701093 },
    imgId: '13699498633677206519',
    width: 1600,
    height: 1200 },
  { url: 'http://img.adkalava.com/img006/059/b58415e3729ccc63.jpg',
    box: 
         { xmax: 0.33379622708306,
           uid: 8286301,
           ymin: 0.59658333333333,
           xmin: 0.266296875,
           ymax: 0.62315563255651 },
    imgId: '13079603284415401059',
    width: 1600,
    height: 1200 },
  { url: 'http://img.adkalava.com/img006/604/2447b64c3664b8ec.jpg',
    box: 
         { xmax: 0.43669599252896,
           uid: 8285126,
           ymin: 0.61772538989639,
           xmin: 0.35294599252896,
           ymax: 0.65448484280405 },
    imgId: '2614258547158202604',
    width: 1600,
    height: 1200 },
  { url: 'http://img.adkalava.com/img006/284/f926f377e4fd48d4.jpg',
    box: 
         { xmax: 0.44001038238067,
           uid: 8286560,
           ymin: 0.19096666666666,
           xmin: 0.339925,
           ymax: 0.2436997676581 },
    imgId: '17953304660827523284',
    width: 1600,
    height: 1200 },
  { url: 'http://img.adkalava.com/img006/148/90d42b2beb081bec.jpg',
    box: 
         { xmax: 0.53821516883899,
           uid: 8287655,
           ymin: 0.69309166666667,
           xmin: 0.41285625,
           ymax: 0.74660057796889 },
    imgId: '10436013704151047148',
    width: 1600,
    height: 1200 },
  { url: 'http://img.adkalava.com/img006/873/39430aad24d957f1.jpg',
    box: 
         { xmax: 0.56364389763867,
           uid: 8287442,
           ymin: 0.58287222222222,
           xmin: 0.48641041666667,
           ymax: 0.61583008459566 },
    imgId: '4126153422365349873',
    width: 1600,
    height: 1200 },
  { url: 'http://img.adkalava.com/img006/807/89252ebbef06fb9f.jpg',
    box: 
         { xmax: 0.57099300893524,
           uid: 8287126,
           ymin: 0.61716458333333,
           xmin: 0.499634375,
           ymax: 0.64308444945563 },
    imgId: '9882356342038395807',
    width: 1600,
    height: 1200 }
];
