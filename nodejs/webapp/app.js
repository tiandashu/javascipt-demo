var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 3000;

app.set('views','./views/pages');
app.set('view engine','jade');
// app.use(express.bodyParser());
app.use(express.static(path.join(__dirname,'bower_components')))
app.listen(port);
console.log('webapp started port: '+port);

//index page
app.get('/',function(req,res){
    res.render('index',{
        title:'index|首页',
        movies: [
            {
                title: '机械战警',
                _id: 1,
                poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
            },
            {
                title: '机械战警',
                _id: 2,
                poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
            },
            {
                title: '机械战警',
                _id: 3,
                poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
            },
            {
                title: '机械战警',
                _id: 4,
                poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
            },
            {
                title: '机械战警',
                _id: 5,
                poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
            },
            {
                title: '机械战警',
                _id: 6,
                poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
            },
        ]
    })
});

app.get('/movie/:id',function(req,res){
    res.render('detail',{
        title:'detail|详情页',
        id:23
    })
});

//admin
app.get('/admin/movie',function(req,res){
    res.render('admin',{
        title:'后台录入页'
    })
});

app.get('/admin/list',function(req,res){
    res.render('list',{
        title:'list|列表页'
    })
});