const express = require('express')
const router = express.Router()
// database'i çek
const { local_db } = require('../../database/db')


const user_ornek = {

    id: 23,
    name: "omer",
    role: "admin"
}

const usersiz_ornek = null

const currentUser = {

    data: user_ornek
 
}

// yetkilendirme sistemi
const authnetication = (request, response, next) => {

    // eğer user varsa geçiş izni ver
    if (currentUser.data) {
        // requeste kaydet
        request.name = currentUser.data
        return next()
    }

    // yoksa
    return response.status(403).send("<h1>Buraya görme yetkin yok</h1>")
}


const permission_check = (request, response, next) => {

    if (request.name.role !== "admin") {

        return response.send("Admin olmadığın için burayı göremezsin.")
    }

    // geçiş izni ver
    next()
}

const single_level_middleware = (request, response, next) => {

    console.log("BEN SADECE BU ENDPOINTTE ÇALIŞIRIM")
    next()

}

// güvenlik mekanizmasını kullan
// router level middleware
router.use(authnetication)
router.use(permission_check)


router.get("/users", single_level_middleware, (request, response) => {

    console.log("isteği yapan eleman:", request.name)

  
    response.json(local_db)


})



router.get("/fake_kullanici", (request, response) => {

    const htmlData = `
    <h1>Merhaba Herkese</h1>
    <p>Bu bir embed html'dir</p>
    `
    response.send(htmlData)


})

router.get("/users/:param", (request, response) => {

    console.log("URL:", request.originalUrl)
    console.log("Query Params:", request.params)
    console.log("Query Search:", request.query)
    const query = request.params.param
    // HTTP Kuralları gereği client'e bir response dönemk zorundasın.
    const user = local_db.find(veri => veri.id == query || veri.name == query)

    if (user) {

        response.json(user)

    } else {

        response.json("Böyle bir kullanıcı yok")
    }

})




// db'e yeni useri kaydet
router.post("/users", (request, response) => {

    // data
    console.log("gelen data:",request.body)
    const { username, hoby } = request.body

    if (username && hoby) {

        const data = {

            id: Date.now(),
            name: username,
            hobies: [hoby]
        }

        // db'e pushla
        local_db.push(data)
        // yönlendir
        response.redirect("/users")
    } else {

        response.json("Lütfen gerekli inputları doldurunuz.")
    }

   

})




// Router'i modül olarak dışarı çıkart
module.exports = router