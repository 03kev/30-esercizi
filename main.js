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
                    .reduce((acc, e) => acc += e)
        case 9:
            return null
        case 10:
            return null
        case 11:
            return null
        case 12:
            return null
        case 13:
            return null
        case 14:
            return null
        case 15:
            return null
        case 16:
            return null
        case 17:
            return null
        case 18:
            return null
        case 19:
            return null
        case 20:
            return null
        case 21:
            return null
        case 22:
            return null
        case 23:
            return null
        case 24:
            return null
        case 25:
            return null
        case 26:
            return null
        case 27:
            return null
        case 28:
            return null
        case 29:
            return null
        case 30:
            return null
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
        let risultato = esercizio_operator (esN, data)

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

console.log("Opzioni di input:\n\t- 'acc' per l'accreditamento\n\t- numero dell'esercizio da svolgere")
let input = prompt()
while(true) {
    if (isNaN(input) === false && input !== "") {
        esercizio(input)
        break
    } else if (input === "acc") {
        accreditamento()
        break
    } else {
        console.log("Opzione non valida, riprovare:\n\t- 'acc' per l'accreditamento\n\t- numero dell'esercizio da svolgere")
        input = prompt()
    }
}