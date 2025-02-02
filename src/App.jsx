import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Login from "./components/Login";
import ViewMovieDetails from "./components/ViewMovieDetails";
import EditPage from "./components/EditPage";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/movies"
          element={
            <PrivateRoute>
              <Movies />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/movies/:id"
          element={
            <PrivateRoute>
              <ViewMovieDetails />
            </PrivateRoute>
          }
        />
        <Route path="/editPage/:id" element={<EditPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/movies/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
