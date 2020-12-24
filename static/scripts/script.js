window.onload = function () {
    let tab = []

    if (!!document.cookie) {
        //ujemne
        let ciachoOnload = document.cookie
        let ciacho = JSON.parse(ciachoOnload)
        tab = ciacho
        for (let i = 0; i < ciacho.length; i++) {
            document.getElementsByClassName("ujemneBottom")[0].innerHTML += " <p> - " + ciacho[i].minus + "</p>"
            document.getElementsByClassName("dodatnieBottom")[0].innerHTML += " <p> - " + ciacho[i].plus + "</p>"
        }
    }

    let date = new Date()
    let day = date.getDate()
    if (day < 10) {
        day = "0" + day
    }
    let month = date.getMonth() + 1
    if (month < 10) {
        month = "0" + month
    }
    let year = date.getFullYear()
    let wholeDate = "Data: " + day + ' ' + month + ' ' + year
    document.getElementsByClassName("date")[0].innerHTML = wholeDate



    document.getElementById("btn1").addEventListener("click", function () {
        let minus = document.getElementById("ujemneInput").value
        let kwota = document.getElementById("kwota1").value
        let all = kwota + 'zł ' + minus
        if (minus != '') {
            tab.push({ minus: all })
            console.log(tab)
            let ciastko = JSON.stringify(tab)
            document.cookie = ciastko
            document.getElementsByClassName("ujemneBottom")[0].innerHTML += "<p>- " + all + "</p>"
        }
    })
    document.getElementById("btn2").addEventListener("click", function () {
        let minus = document.getElementById("dodatnieInput").value
        let kwota = document.getElementById("kwota2").value
        let all = kwota + 'zł ' + minus
        if (minus != '') {
            tab.push({ plus: all })
            console.log(tab)
            let ciastko = JSON.stringify(tab)
            document.cookie = ciastko
            document.getElementsByClassName("dodatnieBottom")[0].innerHTML += "<p>+ " + all + "</p>"
        }
    })
};
