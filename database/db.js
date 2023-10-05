// fake_db 
const users = [

    {
        id: 23,
        name: "ömer",
        hobies: ["yazılım", "daha fazla yazılım"]
    }, 
    
    {
        id: 21,
        name: "ceren",
        hobies: ["uyumak", "ders çalışmak"]
    }
]


// film veritabani
const movies = [

    {
        id: 1,
        name: "Mad Max"
    }, 

    {
        id: 2,
        name: "HitMan"
    },

    {
        id: 3,
        name: "NuN"
    }
]



// db'i dışarı çıkart
module.exports = {
    
    local_db: users,
    movie_db: movies
}