const express = require('express')
const app = express()
const port = 3030
const bodyParser     =        require("body-parser");
const synthFunction = require('./text')
const fs = require('fs')
const path = require('path')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'))
app.post('/text',function(req,res){
  const text =req.body.text;
  synthFunction(text).then(filePath => {
    const fullPath = path.join(__dirname, filePath)
    console.log(fullPath)
    const stat = fs.statSync(fullPath)
    console.log({stat})
    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
    });
    const readStream = fs.createReadStream(fullPath);
    readStream.pipe(res);
  })
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))