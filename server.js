var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000;
var path = require("path")
var login = false
var bodyParser = require("body-parser")
let users =
    [
        { id: 1, login: "Skawsoft", password: "Skawsoft", wiek: 12, uczen: "on", gender: "kobieta" }

    ]
//nasłuch na określonym porcie

//Sama góra
app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }));




app.post("/login", function (req, res) {
    if (users.findIndex(users => users.login === req.body.login) != "-1" && users[users.findIndex(users => users.login === req.body.login)].password == req.body.password) {
        login = true
        res.redirect("/admin")
    } else {
        res.send("Nie zostałeś zalogowany eloooo")
    }
})
app.post("/ujemne", function (req, res) {

})
app.post("/register", function (req, res) {
    if (users.findIndex(users => users.login === req.body.login) == "-1") {
        users.push(req.body)
        users[users.length - 1].id = users.length
        console.log(users)
        res.send("Witaj " + req.body.login)
    } else {
        res.send("istnieje taki użytkownik menelu śmierdzący elooo")
    }
})

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/static/pages/login.html'))
})

app.get("/:id", function (req, res) {
    switch (req.params.id) {
        case 'admin':
            if (login)
                res.sendFile(path.join(__dirname + '/static/pages/admin1.html'))
            else
                res.sendFile(path.join(__dirname + '/static/pages/nonLogged.html'))
            break
        case 'login':
            res.sendFile(path.join(__dirname + '/static/pages/login.html'))
            break
        case 'logout':
            login = false
            res.redirect('main')
            break
        case 'register':
            res.sendFile(path.join(__dirname + '/static/pages/register.html'))
            break
        case 'main':
            res.sendFile(path.join(__dirname + '/static/pages/main.html'))
            break
        default:
            res.sendFile(path.join(__dirname + '/static/pages/none.html'))
            break
    }
})

//Sam dół
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})