import { Link } from "react-router-dom";
import "./page404.scss";

const Page404 = () => {
  return (
    <div
      id="page404"
      className="vh-100 d-flex justify-content-center align-items-center position-relative"
    >
      <div className="p-3 rounded-3 shadow-lg">
        <h1 className="text-center mb-4">Page Not Pound</h1>
        <p className="mb-5 fs-2">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </p>
        <div className="text-center">
          <Link className="btn btn-light text-uppercase px-5 py-2" to={"/"}>
              back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page404;
