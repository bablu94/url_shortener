var express = require('express');
var path = require("path")
const hbs = require('hbs')

var app = express();
const viewsPath = path.join(__dirname, './public/views')
const partialPath = path.join(__dirname, './public/partials')
const publicPath = path.join(__dirname, './public')
var port = process.env.port||2000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicPath))

hbs.registerPartial(partialPath, (result) =>{
    console.log(result);
})


app.get('', (req, res) =>{

    res.render('homepage', {
                Title: 'URL Shortener',
                PageTitle: 'URL Shortener'
            });
  
})

app.get("/url", (req, res) =>{
        
        var spawn = require("child_process").spawn;
        
        var script = spawn('python', ["./shortener/shortener.py",
                            req.query.longurl])

        
        script.stdout.on('data', (data) =>{
            res.send({shortURL: `${data.toString()}`});
        })
});

app.get('*', (req, res) => {
    res.send({error: '404 error.'});
})

app.listen(port, () =>{
    console.log(`Listening on ${port}`);
})