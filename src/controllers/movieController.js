const router = require("express").Router();

const movieService = require("../services/movieService");

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const newMovie = req.body;

  try {
    await movieService.create(newMovie);

    res.redirect("/");
  } catch (err) {
    console.log(err.message);

    res.redirect("/create");
  }
});

router.get("/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  const movie = movieService.getOne(movieId);

  //TODO: Use Handlebars helpers
  movie.rating = new Array(Number(movie.rating)).fill(true);
  // movie.ratingStars = '&#x2605;'.repeat(movie.rating);

  res.render("details", { movie });
});

module.exports = router;
