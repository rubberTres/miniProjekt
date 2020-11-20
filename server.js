var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000;
var path = require("path")
var login = false
var bodyParser = require("body-parser")
let users =
    [
        { id: 1, login: "AAA", password: "123", wiek: 12, uczen: "on", gender: "kobieta" },
        { id: 2, login: "BBB", password: "123", wiek: 19, gender: "chlop" },
        { id: 3, login: "CCC", password: "123", wiek: 20, gender: "chlop" },
        { id: 4, login: "DDD", password: "123", wiek: 10, uczen: "on", gender: "kobieta" },
        { id: 5, login: "EEE", password: "123", wiek: 14, uczen: "on", gender: "kobieta" },
        { id: 6, login: "FFF", password: "123", wiek: 14, gender: "chlop" },

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
        case 'register':
            res.sendFile(path.join(__dirname + '/static/pages/register.html'))
            break
        case 'main':
            res.sendFile(path.join(__dirname + '/static/pages/main.html'))
            break
        case 'show':
            users = (users.sort(function (a, b) {
                return parseFloat(a.id) - parseFloat(b.id);
            }));
            if (login) {
                let tabela = '<a href="show">show</a> <a href="gender">gender</a> <a href="sort">sort</a> <a href="admin">admin</a> <table style="border: 1px solid black;">'
                for (let i = 0; i < users.length; i++) {
                    tabela += '<tr> <td> id: ' + users[i].id + '</td> <td>Login: ' + users[i].login + ' - ' + users[i].password + '</td>'
                    if (users[i].uczen == 'on') {
                        tabela += '<td>Uczeń: <input type="checkbox" checked disabled> </td>'
                    } else {
                        tabela += '<td>Uczeń: <input type="checkbox" disabled> </td>'
                    }
                    tabela += '<td> Wiek: ' + users[i].wiek + '</td> <td> Płeć: ' + users[i].gender + '</td>'
                }
                tabela += '</table>'
                res.send(tabela)
            } else {
                res.send("yyy, a może by się Pan zalogował?")
            }
            break
        case 'gender':
            users = (users.sort(function (a, b) {
                return parseFloat(a.id) - parseFloat(b.id);
            }));
            let nav = '<a href="show">show</a> <a href="gender">gender</a> <a href="sort">sort</a> <a href="admin">admin</a>'
            let tabelaK = '<table style="border:1px solid black">'
            let tabelaM = tabelaK
            for (let i = 0; i < users.length; i++) {
                if (users[i].gender == 'kobieta') {
                    let id = "<td>id: " + users[i].id + "</td>";
                    let plec = "<td>płeć: " + users[i].gender + "</td>";
                    tabelaK += "<tr>" + id + plec + "</tr>";
                } else {
                    let id = "<td>id: " + users[i].id + "</td>";
                    let plec = "<td>płeć: " + users[i].gender + "</td>";
                    tabelaM += "<tr>" + id + plec + "</tr>";
                }
            }
            let total = nav + tabelaK + '</table><br>' + tabelaM + '</table>'
            res.send(total)
            break
        case 'sort':
            let tab = users;
            if (req.query.sortowanie == 0) {
                tab = (tab.sort(function (a, b) {
                    return parseFloat(b.wiek) - parseFloat(a.wiek);
                }));
            } else {
                tab = (tab.sort(function (a, b) {
                    return parseFloat(a.wiek) - parseFloat(b.wiek);
                }));
            }
            let sortowanie = '<form action ="/sort" onchange="this.submit()" style="margin-left: 20px;"><input type="radio" name="sortowanie" value = "1">rosnaco<input type="radio" name="sortowanie" value = "0" style="margin-left: 20px">malejaco</form>'
            let nav1 = '<a href="show">show</a> <a href="gender">gender</a> <a href="sort">sort</a> <a href="admin">admin</a>'
            let tabela = '<table style="border: 1px solid black;">'
            for (let i = 0; i < users.length; i++) {
                tabela += '<tr> <td> id: ' + users[i].id + '</td> <td>Login: ' + users[i].login + ' - ' + users[i].password + '</td>'
                if (users[i].uczen == 'on') {
                    tabela += '<td>Uczeń: <input type="checkbox" checked disabled> </td>'
                } else {
                    tabela += '<td>Uczeń: <input type="checkbox" disabled> </td>'
                }
                tabela += '<td> Wiek: ' + users[i].wiek + '</td> <td> Płeć: ' + users[i].gender + '</td>'
            }
            tabela += '</table>'
            let totalSort = nav1 + sortowanie + tabela
            res.send(totalSort)



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