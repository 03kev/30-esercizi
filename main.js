const fetch = require("node-fetch")
const prompt = require('prompt-sync')()

const url = "http://192.168.1.231:8080"
const name = "Kevin Muka"

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
            return data
                .filter(e => e%2 !== 0)
                .reduce((acc, e) => acc += e)

        case 10:
            return data.sort()

        case 11:
            return data.map(e => e.toLowerCase()).sort()

        case 12:
            return data.map(e => e-1)

        case 13:
            return data.map((e, i, arr) => i === arr.length-1 ? e : e += arr[i+1])

        case 14:
            return data.reduce((acc, e) => {
                (e === 0) ?
                    acc.zeri++ :
                    (e > 0) ?
                        acc.positivi++ :
                        acc.negativi++
                return acc
            }, {
                positivi: 0,
                negativi: 0,
                zeri: 0
            })

        case 15:
            return data.map(e => e.length%2 === 0 ? e.toUpperCase() : e.toLowerCase())

        case 16:
            return data.join(" ")

        case 17:
            return data.reduce((acc, e) => acc += e.charAt(e.length-1), "")

        case 18:
            return data.reduce((acc, e) => {
                if (e.length > 4) {
                    return acc += e[0]
                } else {
                    return acc
                }
            }, "")

        case 19:
            let dividers = []
            for (let i = 0; i <= data; i++) {
                if (data%i === 0){
                    dividers.push(i)
                }
            }
            return dividers

        case 20:
            return data.map(e => e.figli.length)

        case 21:
            return data.filter(e => e <= 5)

        case 22:
            return data.filter(e => e >= 3 && e <= 6)

        case 23:
            return data.reduce((acc, e) => acc += e.anni, 0)

        case 24:
            return data
                .filter(e => e.cognome[0] === "C")
                .map(e => e.nome)

        case 25:
            return data.reduce((acc, e) => acc += e.split("a").length-1, 0)

        case 26:
            return data.map(e => e * -1)

        case 27:
            let keys = Object.keys(data)
            let list = []
            for (let i = 0; i < keys.length; i++) {
                for (let e of data[keys[i]]) {
                    if (!list.includes(e)) {
                        list.push(e)
                    }
                }
            }
            return list.sort()

        case 28:
            let object = data.negozio.reduce((acc, e) => {
                if (!(e in acc)) {
                    acc[e] = 1
                } else {
                    acc[e]++
                }
                return acc
            }, {})
            data.magazzino.forEach(e => {
                if (e in object) {
                    object[e]++
                }
            })
            return object

        case 29:
            let factorial = 1
            for (let i = 2; i <= data; i++){
                factorial *= i
            }
            return factorial

        case 30:
            let map = data.split("\n")
            for (let i = 0; i < map.length; i++) {
                if (map[i].includes("X")) {
                    return {x: map[i].indexOf("X"), y: i}
                }
            }

        default:
            return null
    }
}

const accreditamento = (url, name) => {
    fetch(`${url}/accreditamento`, {
        method: "post",
        body: JSON.stringify({
            nome: name
        }),
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(res => res.json())
    .then(resBody => console.log(resBody))
    .catch(err => console.log(err))
}

const voto = (url) => {
    fetch(`${url}/voto`, {
        method: "get",
        headers: {
            "x-data": "true"
        },
    })
    .then(res => res.json())
    .then(resBody => {
        console.log(`Il tuo punteggio:`, resBody)
    })
    .catch(err => console.log(err))
}

const esercizio = (url, esN) => {
    fetch(`${url}/esercizi/${esN}`, {
        method: "get",
        headers: {
            "x-data": "true"
        },
    })
    .then(res => {
        return res.json()
    })
    .then(resBody => {
        const data = resBody.data
        let risultato = esercizio_operator (esN, data)

        return fetch(`${url}/esercizi/${esN}`, {
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
    .then(resBody => console.log(`Esercizio ${esN}:\n`, resBody))
    .catch(err => console.log(err))
}

const consegna = (url, esN) => {
    fetch(`${url}/esercizi/${esN}`, {
        method: "get",
        headers: {
            "x-data": "true"
        },
    })
    .then(res => res.json())
    .then(resBody => {
        console.log(`Esercizio ${esN}:\n`, resBody)
    })
    .catch(err => console.log(err))
}

const legend = "- 'acc' per fare l'accreditamento\n\t" +
    "- 'voto' per vedere il punteggio\n\t" +
    "- 'ris {opzione}' per consegnare. Le varie opzioni:\n\t\t" +
        "+ '{n}' per consegnare un solo esercizio\n\t\t" +
        "+ '{n1 / n2}' per consegnare un range di esercizi\n\t\t" +
        "+ '{n1, n2...}' per consegnare vari esercizi\n\t" +
    "- 'con {opzione}' per vedere la consegna. Le varie opzioni:\n\t\t" +
        "+ '{n}' per vedere una sola consegna\n\t\t" +
        "+ '{n1 / n2}' per vedere un range di consegne\n\t\t" +
        "+ '{n1, n2...}' per vedere varie consegne"

console.log("Opzioni di input:\n\t" + legend)
let userInput = prompt()

while(true) {
    if (userInput.substring(0, 3) === "ris") {
        let risInput = userInput.slice(3)
        
        if (risInput.includes("/")) {
            let risRange = risInput.split("/")
            for (let i = +risRange[0]; i <= +risRange[1]; i++){
                esercizio(url, i)
            }
        } else if (risInput.includes(",")) {
            let risRange = risInput.split(",")
            for (let i = 0; i < risRange.length; i++){
                esercizio(url, +risRange[i])
            }
        } else {
            esercizio(url, +risInput)
        }
        break

    } else if (userInput.substring(0, 3) === "con") {
        let risInput = userInput.slice(3)
       
        if (risInput.includes("/")) {
            let risRange = risInput.split("/")
            for (let i = +risRange[0]; i <= +risRange[1]; i++){
                consegna(url, i)
            }
        } else if (risInput.includes(",")) {
            let risRange = risInput.split(",")
            for (let i = 0; i < risRange.length; i++){
                consegna(url, +risRange[i])
            }
        } else {
            consegna(url, +risInput)
        }
        break

    } else if (userInput === "acc") {
        accreditamento(url, name)
        break
    } else if (userInput === "voto") {
        voto(url)
        break
    } else {
        console.log("Opzione non valida, riprovare:\n\t" + legend)
        userInput = prompt()
    }
}
