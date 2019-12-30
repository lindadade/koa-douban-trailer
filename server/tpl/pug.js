module.exports = `
doctype html
html
  head
    meta(charset="utf-8")
    meta(name="viewport", content="width=device-width, initial-scale=1")
    title Koa Server Pug
    link(href="https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet")
    script(src="https://cdn.bootcss.com/jquery/3.4.0/jquery.min.js")
    script(src="https://cdn.bootcss.com/twitter-bootstrap/4.3.0/js/bootstrap.min.js")
body
 div.container
   div.row
     div.col-md-8
       h1 H1 #{you}
       p This is #{me}
     div.col-md-4
       p 测试 动态  Pug 模版引擎
`