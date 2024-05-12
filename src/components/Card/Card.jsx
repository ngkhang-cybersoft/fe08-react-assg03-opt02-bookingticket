import { Link } from "react-router-dom";
import "./Card.scss"

const Card = (props) => {
  const { movie } = props;

  return (
    <div className="card h-100">
      <div className="card-thumb position-relative text-center">
        <img src={movie.poster} className="card-img-top" alt={movie.slug} />
        <span
          className={`position-absolute top-0 start-0 rounded-2 text-white px-2 py-1 mt-2 ms-2 cinema-rate-${movie.rateType.toLowerCase()}`}
        >
          {movie.rateType}
        </span>
      </div>
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="mb-3">
          <h5 className="card-title">{movie.title}</h5>
          <p className="card-text">{movie.description}</p>
        </div>
        <Link className="btn btn-primary" to={`/booking/${movie.slug}`}>
          Đặt vé
        </Link>
      </div>
    </div>
  );
};

export default Card;
