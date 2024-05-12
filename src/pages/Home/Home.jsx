import { useEffect, useState } from "react";
import DataMovie from "../../../dataMovie.json";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import "./Home.scss";

const Home = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    let timeId = setTimeout(() => {
      setMovies(DataMovie);
    }, 500);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <div className="container d-flex flex-column min-vh-100">
      <h1 className="py-4 text-center">Showing</h1>
      <div className="row align-items-stretch flex-grow-1">
        {movies && movies.length > 0 ? (
          movies.map((movie) => {
            return (
              <div key={movie.id} className="col-12 col-md-6 col-lg-3 mb-4">
                <Card movie={movie} />
              </div>
            );
          })
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
