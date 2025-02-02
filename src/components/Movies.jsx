import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Movies() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredMovies, setfilteredMovies] = useState([]);
  const [addMovie, setAddMovie] = useState(false);
  const [viewEditForm, setViewEditForm] = useState(false);
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(6);

  const [movieData, setMovieData] = useState({
    title: "",
    poster: "",
    releaseDate: "",
    genre: "",
    description: "",
  });

  function handleEdit(id) {
    console.log(id, "ignore for now");
    navigate(`/editPage/${id}`);
  }
  function handleDelete(id) {
    axios({
      url: `https://inexpensive-spicy-principle.glitch.me/movies/${id}`,
      method: "DELETE",
    })
      .then(() => {
        let confirmation = confirm("Are you sure to delete this movie?");
        if (confirmation) {
          console.log(confirmation);
          setMovies(movies.filter((el) => el.id !== id));
        } else {
          return;
        }
      })
      .catch((err) => alert("failed to delete movie"));
  }

  useEffect(() => {
    function fetchData() {
      setLoading(true);
      axios({
        url: `https://inexpensive-spicy-principle.glitch.me/movies?genre=${genre}&page=${page}&limit=${limit}`,
        method: "GET",
      })
        .then((res) => {
          if (res.data.movies.length == 0) {
            setHasMore(false);
          } else {
            setMovies([...movies, ...res.data.movies]);
          }
          setPage(res.data.currentPage);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
    if (!localStorage.getItem("token")) {
      alert("Please Login!");
      navigate("/login");
    } else {
      fetchData();
    }
  }, [genre, page, limit]);
  // posting
  function handleSubmit(e) {
    e.preventDefault();
    console.log(movieData);
    axios({
      url: `https://inexpensive-spicy-principle.glitch.me/movies/`,
      method: "POST",
      data: {
        id: movies.length ? movies[movies.length - 1].id + 1 : 1,
        title: movieData.title,
        poster: movieData.poster,
        releaseDate: movieData.releaseDate,
        genre: movieData.genre,
        description: movieData.description,
      },
    })
      .then((res) => setMovies([...movies, res.data]))
      .catch((err) => console.log("error while posting movies", err))
      .finally(() => setAddMovie(false));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  }
  function handleAddMovieBtn() {
    setAddMovie(!addMovie);
  }

  return (
    <div>
      <div className="genreAndForm">
        <button onClick={handleAddMovieBtn} className="addMovieBtn">
          Add Movie
        </button>

        {/* filter div */}
        <div>
          <select
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
            }}
            name="genre"
          >
            <option value="">--All Genre--</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Animation">Animation</option>
            <option value="Crime">Crime</option>
            <option value="Romance">Romance</option>
          </select>
        </div>
      </div>
      {addMovie && (
        <div>
          <form onSubmit={handleSubmit} className="addMovieForm">
            <label htmlFor="movieTitle">Title:</label>
            <input
              type="text"
              placeholder="Movie title"
              id="movieTitle"
              name="title"
              value={movieData.title}
              onChange={handleChange}
            />
            <label htmlFor="poster">Image:</label>
            <input
              type="text"
              placeholder="Enter url"
              id="poster"
              name="poster"
              value={movieData.poster}
              onChange={handleChange}
            />
            <label htmlFor="releaseDate">Release Date:</label>
            <input
              type="date"
              placeholder="yyyy-mm-dd"
              id="releaseDate"
              name="releaseDate"
              value={movieData.releaseDate}
              onChange={handleChange}
            />
            <label htmlFor="genre">Genre:</label>
            <select
              id="genre"
              value={movieData.genre}
              onChange={handleChange}
              name="genre"
            >
              <option value="">Choose Genre</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Animation">Animation</option>
              <option value="Crime">Crime</option>
              <option value="Romance">Romance</option>
            </select>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              placeholder="Enter description"
              id="description"
              name="description"
              value={movieData.description}
              onChange={handleChange}
            />
            <input type="submit" value={"Add movie"} />
          </form>
        </div>
      )}

      {/* movies */}
      <InfiniteScroll
        dataLength={movies.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="moviesCont">
          {movies.map((el) => {
            return (
              <div key={el.id} className="movieCard">
                <img src={el.poster} alt={el.title} className="movieImg" />
                <h2>{el.title}</h2>

                <p>{el.description}</p>
                <div className="btnCont">
                  <button className="editBtn" onClick={() => handleEdit(el.id)}>
                    Edit
                  </button>
                  <button
                    className="deleteBtn"
                    onClick={() => handleDelete(el.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="viewBtn"
                    onClick={() => navigate(`/movies/${el.id}`)}
                  >
                    View more...
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
