const express = require('express')
const router = express.Router()

// ilgili db'i çek
const { movie_db } = require('../../database/db')

router.get("/movies", (request, response) => {


    response.json(movie_db)

})



// routeri export olarak çıkart
module.exports = router