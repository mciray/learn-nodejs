const express = require('express')
const router = express.Router()

// send_target_file fonksiyonunu çağır
const { send_target_file } = require('../../utils/sendFiles')





router.get("/test", (request, response) => {

    console.log(request.hostname)
    console.log("Dosya PATH:", process.cwd())
    // response.json("Merhaba Dünya")
    // dosya dön
    response.sendFile(send_target_file("test.html"))

})



module.exports = router