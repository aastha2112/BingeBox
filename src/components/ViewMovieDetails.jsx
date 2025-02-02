import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewMovieDetails() {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        <h3 className="error">
          Oops! There is some problem in getting the details..
        </h3>
      ) : loading ? (
        <h3>Loading Details...</h3>
      ) : (
        <>
          <div className="viewDetailsDiv">
            <img src={movie.poster} alt={movie.title} />
            <div className="details">
              <h2>{movie.title}</h2>
              <h3>Genre: {movie.genre}</h3>
              <p>{movie.description}</p>
              <h4>Released on {movie.releaseDate}</h4>
              <button disabled>Watch Now</button>
            </div>
          </div>
          <button
            className="backtoMoviesBtn"
            onClick={() => navigate("/movies")}
          >
            Back to movies
          </button>
        </>
      )}
    </>
  );
}
