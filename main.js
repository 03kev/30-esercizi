const fetch = require("node-fetch")
const prompt = require('prompt-sync')()

const esercizio_operator = (esN, data) => {
    switch (esN) {
        case 1:
            return data.toLowerCase()
        case 2:
            return data**2
        case 3:
            return data.cognome
        case 4:
            return data.length
        case 5:
            return data.map(e => e.toUpperCase())
        case 6:
            return data.reduce((acc, e) => acc += e)
        case 7:
            return data
                    .filter(e => e > 5)
                    .reduce((acc, e) => acc += e)
        case 8:
            return data
                    .filter((e, i) => i%2 === 0)
                    .reduce((acc, e) => acc +=e)
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        case 25:
        case 26:
        case 27:
        case 28:
        case 29:
        case 30:
        default:
            console.log(`L'esercizio ${esN} non e' presente.`)
            return null
    }
}

const accreditamento = () => {
    fetch("http://192.168.1.231:8080/accreditamento", {
        method: "post",
        body: JSON.stringify({
            nome: "Kevin Muka"
        }),
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(res => res.json())
    .then(resBody => console.log(resBody))
    .catch(err => console.log(err))
}

const esercizio = (esN) => {
    fetch(`http://192.168.1.231:8080/esercizi/${esN}`, {
        method: "get",
        headers: {
            "x-data": "true"
        },
    })
    .then(res => res.json())
    .then(resBody => {
        const data = resBody.data
        let risultato = esercizio_operator(esN, data)

        return fetch(`http://192.168.1.231:8080/esercizi/${esN}`, {
            method: "post",
            body: JSON.stringify({
                data: risultato
            }),
            headers: {
                "Content-Type": "application/json"
            }  
        })
    })
    .then(res => res.json())
    .then(resBody => console.log(resBody))
    .catch(err => console.log(err))
}

let esNumber = +prompt("Esercizio da svolgere: ")
isNaN(esNumber)? 
    accreditamento(): 
    esercizio(esNumber)