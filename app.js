// Server Kurulumu
const express = require('express');

// Server
const app = express();


// formdan gelen verileri parse işlemi yapmak 
app.use(express.urlencoded({extended : true }))

// request => client isteği yapan kişi
// response => serverdan gönderilecek cevap



// Helper functions
const send_file_func = (file_name) => {
    return `${process.cwd()}/pages/${file_name}`
}


app.get('/', (request , response) => {

    console.log(request.hostname);
    // Eğer dosya yönlendireceksen
    response.sendFile(send_file_func("index.html"))
    // Json dönecekse
    response.json("Merhaba Dünya")

})

const data = [{
    id : 1,
    name : "Halil",
    hobies: ["Yazılım", "Daha Çok Yazılım"]
},{
    id : 2,
    name : "Hayri",
    hobies: ["Yazılım", "Daha Çok Yazılım"]
}]





app.get('/users', (request, response) => {
    response.json(data)
})


app.get('/user/:param', (request, response) => {


    // query http://localhost:8000/user/1?name ?den sonra ki yer query oluyor
    console.log("query", request.query);
    // url'den sonra ki gelen yerde params'ı temsil eder!
    console.log("param", request.params);

    const user = data.find(user => user.id == request.params.param)
    
    response.json(user)

})


app.post('/api/v1/post', (request, response) => {

    const {kullanici, password} = request.body
    console.log(request.body);

    const gelenVeri = {
        id : Date.now(),
        name : kullanici,
        hobbies : password
    }

    data.push(gelenVeri)

    response.redirect("/users")

})

app.get('/api/v1/post', (request, response) => {
    response.sendFile(send_file_func("index.html"))
})


// PORT
const port = 8000

app.listen(port,() => {
    console.log(`Server Run: ${port} portunda çalışıyor`);
})