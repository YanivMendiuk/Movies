const express = require("express")
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("home")
})

app.get("/about", function (req, res) {
    res.render("about")
})

app.get("/contact", function (req, res) {
    res.render("contact")
})

app.post("/", function (req, res) {
    const query = req.body.movieName;
    const url =
        "https://api.themoviedb.org/3/search/movie?api_key=f87067c77f773bfd53f4c2529a4838d8&query=" +
        query
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const movieData = JSON.parse(data);
            const title = movieData.results[0].title;
            const overview = movieData.results[0].overview;
            const poster_path = movieData.results[0].poster_path;
            res.render("movie", { movieTitle: title, movieOverview: overview, moivePoster: poster_path })
            res.send();
        });
    });
});

app.listen(3000, function (req, res) {
    console.log("Server is running on port 3000")
})