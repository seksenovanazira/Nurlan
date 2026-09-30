// Optional local server. No packages required.
const http=require('http');
const fs=require('fs');
const path=require('path');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};
http.createServer((req,res)=>{
  const url=new URL(req.url,'http://127.0.0.1');
  const name=url.pathname==='/'?'index.html':url.pathname.slice(1);
  if(!['index.html','styles.css','app.js'].includes(name)){res.writeHead(404);res.end('Not found');return;}
  fs.readFile(path.join(__dirname,name),(err,data)=>{if(err){res.writeHead(500);res.end('Read error');return;}res.writeHead(200,{'Content-Type':types[path.extname(name)],'Cache-Control':'no-store'});res.end(data);});
}).listen(8765,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:8765'));
