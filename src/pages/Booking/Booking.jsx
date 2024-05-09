import "./Booking.scss";
import Seats from "../../../dataSeats.json";
import DataMovie from "../../../dataMovie.json";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTicket, delAllTicket } from "../../redux/reducers/rdcTicket";
import { setConfig } from "../../redux/reducers/rdcToast";

const rowsSeat = Seats.slice(1);
const infoSeat = [
  {
    id: 1,
    type: "empty",
    content: "Ghế VIP",
    className: "empty",
  },
  {
    id: 2,
    type: "block",
    content: "Đã đặt",
    className: "block",
  },
  {
    id: 3,
    type: "booking",
    content: "Ghế đang chọn",
    className: "booking",
  },
];
const getStatusSeat = (seats, daDat, soGhe) => {
  if (daDat) return "block";
  return seats.findIndex((ticket) => ticket.soGhe === soGhe) !== -1
    ? "booking"
    : "empty";
};

const Home = () => {
  const [movie, setMovie] = useState({});
  const { movieSlug } = useParams();
  const refHome = useRef(null);
  const { tickets } = useSelector((state) => state.rdcTicket);
  const { toast } = useSelector((state) => state.rdcToast);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    refHome.current.scrollIntoView();
    dispatch(delAllTicket());
  }, [refHome, dispatch]);

  useEffect(() => {
    const movie = DataMovie.find((item) => item.slug === movieSlug);
    if (!movie) navigate("/error", { replace: true });
    setMovie(movie);
  }, [movieSlug, navigate]);

  // Add new ticket
  const handleAddTicket = (seat) => {
    const action = addTicket({
      seat,
    });
    dispatch(action);
  };

  // Delete All tickets
  const handleDelAllTicket = () => {
    dispatch(delAllTicket());
  };

  // Direct
  const handleDirect = () => {
    handleDelAllTicket();
    navigate("/");
  };

  // Button Payment
  const handleBtnPayment = () => {
    let configToast = { ...toast };
    if (tickets.length) {
      configToast = {
        isShow: true,
        isSuccess: true,
        className: "bg-success text-white",
        content: {
          title: "Thanh toán",
          message: "Thanh toán thành công",
        },
        handleDirect,
      };
    } else {
      configToast = {
        isShow: true,
        className: "bg-danger text-white",
        content: {
          title: "Thanh toán",
          message: "Vui long chọn vé",
        },
        isSuccess: false,
      };
    }

    dispatch(setConfig(configToast));
  };

  return (
    <>
      <div id="homePage" ref={refHome} className="py-4">
        <div className="container-lg">
          <div className="card">
            <div className="card-header text-center px-4">
              <h3 className="mb-0 py-2 py-md-3 fs-4">Booking Ticket</h3>
            </div>
            <div className="card-body bg-dark p-4">
              <div className="row justify-content-center mb-3 text-light">
                <span
                  className="bg-light mb-1"
                  style={{ height: "2px", width: "50%" }}
                ></span>
                <span className="text-center text-uppercase">màn hình</span>
              </div>

              <div className="mb-5">
                {rowsSeat.map((rowItem) => {
                  return (
                    <div key={rowItem.hang} className="row my-2 my-lg-3">
                      {rowItem.danhSachGhe.map((seat) => {
                        return (
                          <div
                            key={seat.soGhe}
                            className="seat col-1 px-1 px-xxl-2 d-flex justify-content-center align-items-center"
                          >
                            <button
                              className={`w-100 py-1 py-md-2 rounded-2 ${getStatusSeat(
                                tickets,
                                seat.daDat,
                                seat.soGhe
                              )}`}
                              disabled={seat.daDat}
                              onClick={() => handleAddTicket(seat)}
                            >
                              {seat.soGhe}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              <div className="info-seats row justify-content-center mb-2">
                {infoSeat.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="d-flex align-items-center"
                      style={{ width: "fit-content" }}
                    >
                      <span className={`me-2 ${item.className}`}></span>
                      <p className="text-white mb-0">{item.content}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="card-footer py-3">
              <div className="border-bottom py-2 py-lg-3">
                <div className="d-flex align-items-center mb-1 mb-md-2">
                  <span className="px-2 px-lg-3 py-1 rounded-1 text-white bg-primary me-2">
                    {movie.rateType}
                  </span>
                  <h5 className="fw-bold mb-0">{movie.title}</h5>
                </div>
                <p className="text-warning flex-grow-1 mb-0">
                  {movie.showInfo}
                </p>
              </div>

              <div className="row align-items-center justify-content-between border-bottom py-2 py-lg-3">
                <p className="col-4 mb-0">Chỗ ngồi</p>
                <div className="col-8 d-flex justify-content-end">
                  <div
                    className={`${
                      tickets.length ? "d-flex" : "d-none"
                    } align-items-stretch justify-content-between border border-1 rounded-2 px-2 px-md-3 py-1 py-md-2`}
                  >
                    <p className="mb-0 col-10">
                      {tickets.map((ticket) => ticket.soGhe).join(", ")}
                    </p>
                    <button
                      className="col-2 btn btn-danger rounded-circle"
                      onClick={handleDelAllTicket}
                    >
                      <div className="d-flex justify-content-center align-items-center">
                        <i className="fa-solid fa-x"></i>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="row justify-content-between align-items-stretch py-2 py-lg-3">
                <div className="col-4">
                  <p className="fw-bold mb-1 mb-md-2">Tạm tính</p>
                  <p className="fw-bold fs-6 mb-0">
                    {tickets.reduce(
                      (total, ticket) => (total += ticket.gia),
                      0
                    )}
                  </p>
                </div>
                <div className="col-8 d-flex justify-content-end">
                  <button
                    className="btn btn-payment px-4 px-md-5"
                    onClick={handleBtnPayment}
                  >
                    Mua vé
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
