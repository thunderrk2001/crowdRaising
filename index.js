const express = require("express")
const app = express();
const path = require("path")
app.set("views", path.join(__dirname, "client"))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "client/js")));
app.get("/", (req, res) => {
    res.status(200).render("./homePage.ejs");
})
app.listen(2000, (err) => {
    if (!err)
        console.log("listening")
})