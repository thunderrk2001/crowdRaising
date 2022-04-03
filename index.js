const express = require("express")
const app = express();
const path = require("path")
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "client"))

app.use(express.static(path.join(__dirname, "./client")));
app.use(express.static(path.join(__dirname, "./client/js")));

app.get("/", (req, res) => {
    res.status(200).render("./homePage.ejs");
})
app.get("/fund/:address", (req, res) => {
    const address = req.params.address
    res.status(200).render("./fundDetails.ejs", { address: address })
})
app.listen(2000, (err) => {
    if (!err)
        console.log("listening")
})