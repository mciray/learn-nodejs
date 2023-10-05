// server kurulumu
// Import
const express = require('express');
// server:
const app = express();

// built-in middleware
// app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// base_url
const base_url = "/api/v1"
const test_url = "/application/tester"

// API'i çek
const userAPI = require('./routes/api/userAPI')
const movieAPI = require('./routes/api/movieAPI')
const testAPI = require('./routes/api/testAPI')


// utils
const { send_target_file } = require('./utils/sendFiles')


// middlewares
const logger = (request, response, next) => {

    console.log(`Uygulamanın ${request.originalUrl} endpointine ${request.method} isteği yapıldı.`)
    // işin bittiyse bir sonraki endpointe geç
    return next()

}

// request => client isteği yapan kişi
// response => server suncuyu temsil eder


// middleware'i kullan (application level middleware)

app.use(logger)

app.get("/", (request, response) => {
  
    console.log(request.hostname)
    console.log("Dosya PATH:", process.cwd())
    // response.json("Merhaba Dünya")
    // dosya dön
    response.sendFile(send_target_file("index.html"))

})





app.get("/profil", (request, response) => {
  
    response.send("Profil sayfasi")

})

// API'I kullan
app.use(base_url, userAPI)  
// http:localhost:4000/api/v1/users
app.use(base_url, movieAPI)
// http:localhost:4000/api/v1/movies
app.use(test_url, testAPI)
// http:localhost:4000/application/tester/test






// PORT
const port = 5000
app.listen(port, () => {

    console.log(`Node.js uygulaması 5000 portunda çalışıyor. Link: http://localhost:${port}/`)
})
