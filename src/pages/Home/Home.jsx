import "./Home.scss";
import { Link } from "react-router-dom";
import DataMovie from "../../../dataMovie.json";

const Home = () => {
  return (
    <div id="home">
      <div className="container">
        <h1 className='py-4 text-center'>Showing</h1>
        <div className="row align-items-stretch">
          {DataMovie.map((movie) => {
            return (
              <div key={movie.id} className="col-12 col-md-6 col-lg-3 mb-4">
                <div className="card h-100">
                  <div className="position-relative text-center">
                    <img
                      src={movie.poster}
                      className="card-img-top"
                      alt={movie.slug}
                    />
                    <span className="position-absolute top-0 start-0 bg-light rounded-2 px-2 py-1 mt-2 ms-2">
                      {movie.rateType}
                    </span>
                  </div>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div className="mb-3">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text">{movie.description}</p>
                    </div>
                    <Link
                      className="btn btn-primary"
                      to={`/booking/${movie.slug}`}
                    >
                      Đặt vé
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
