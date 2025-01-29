import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Login from "./components/Login";
import ViewMovieDetails from "./components/ViewMovieDetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies/:id" element={<ViewMovieDetails />} />
      </Routes>
    </>
  );
}

export default App;
