const express = require("express")
const app = express()

app.use(express.static("public"))

app.listen(3000)

app.get("/", (req, res) => {
    res.sendFile("public/index.html")
})