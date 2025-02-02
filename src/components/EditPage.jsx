import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function EditPage() {
  const [movieData, setMovieData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");
    axios({
      url: `https://inexpensive-spicy-principle.glitch.me/movies/${id}`,
      method: "PUT",
      data: {
        title: movieData.title,
        poster: movieData.poster,
        releaseDate: movieData.releaseDate,
        genre: movieData.genre,
        description: movieData.description,
      },
    }).then(() => navigate("/movies"));
  }
  function handleChange(e) {
    console.log(e.target.value);
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  }
  useEffect(() => {
    axios({
      url: `https://inexpensive-spicy-principle.glitch.me/movies/${id}`,
      method: "GET",
    }).then((res) => {
      console.log(res.data, "response");
      setMovieData(res.data);
      console.log(id);
    });
  }, [id]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="movieTitle">Title:</label>
        <input
          type="text"
          id="movieTitle"
          name="title"
          value={movieData.title}
          onChange={handleChange}
        />
        <label htmlFor="poster">Image:</label>
        <input
          type="text"
          id="poster"
          name="poster"
          value={movieData.poster}
          onChange={handleChange}
        />
        <label htmlFor="releaseDate">Release Date:</label>
        <input
          type="date"
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
          id="description"
          name="description"
          value={movieData.description}
          onChange={handleChange}
        />
        <input type="submit" value={"Edit movie"} />
      </form>
    </div>
  );
}
