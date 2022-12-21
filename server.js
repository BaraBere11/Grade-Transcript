const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(__dirname));
app.use(express.static("/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
var exphbs = require("express-handlebars");
app.engine(".hbs", exphbs.engine({
    extname:".hbs" ,
    defaultLayout: "main",
    helpers: { 
        navLink: function(url, options) {
            return '<li' +
            ((url == app.locals.activeRoute) ? ' class="active1"' : '') +
            '><a href=" ' + url + ' ">' + options.fn(this) + '</a></li>';
           }, 
           equal: function (lvalue, rvalue, options) {
                if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
                if (lvalue != rvalue) {
                return options.inverse(this);
                } else {
                return options.fn(this);
                }
           }
    }
}));

app.set("view engine", ".hbs");
const HTTP_PORT = process.env.PORT || 8080;

app.use(function(req,res,next){
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
   });

app.get("/", (req, res) => {
    res.render('demo');
});

app.get("*", (req, res) => {
    res.status(404).send('Not found');
});

app.listen(HTTP_PORT, function(){
    console.log("app listening on: " + HTTP_PORT)
    });