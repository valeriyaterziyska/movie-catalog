const Movie = require("../models/Movie");
const Cast = require("../models/Cast");

exports.getAll = () => Movie.find();

//TODO: Filter result in mongoDB
exports.search = async (title, genre, year) => {
  let result = await Movie.find().lean();

  if (title) {
    result = result.filter((movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (genre) {
    result = result.filter((movie) =>
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  if (year) {
    result = result.filter((movie) => movie.year === year);
  }

  return result;
};

exports.getOne = (movieId) => Movie.findById(movieId).populate("casts");

exports.create = (movieData) => Movie.create(movieData);

exports.attach = async (movieId, castId) => {
  // Another way to attach castID
  // return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });

  const movie = await this.getOne(movieId);


  //TODO: validate castId if exists

  // optional - for double relation
  const cast = await Cast.findById(castId);
  // cast.movies.push(movie);
  // await cast.save();
  
  movie.casts.push(cast);
  await movie.save();
  //TODO: validate if cast is already added
  return movie;
};
