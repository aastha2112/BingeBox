import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewMovieDetails() {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      url: `https://inexpensive-spicy-principle.glitch.me/movies/${id}`,
      method: "GET",
    })
      .then((res) => setMovie(res.data))
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      {error ? (
        <h3>Oops! There is some problem in getting the details..</h3>
      ) : loading ? (
        <h3>Loading Details...</h3>
      ) : (
        <div>
          <img src={movie.poster} alt={movie.title} />
          <h2>{movie.title}</h2>
          <h3>Genre: {movie.genre}</h3>
          <p>{movie.description}</p>
          <p>Released on {movie.releaseDate}</p>
        </div>
      )}
    </>
  );
}
