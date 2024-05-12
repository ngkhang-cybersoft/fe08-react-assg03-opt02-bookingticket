import "./Booking.scss";
import Seats from "../../../dataSeats.json";
import DataMovie from "../../../dataMovie.json";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTicket, delAllTicket } from "../../redux/reducers/rdcTicket";
import { setConfig } from "../../redux/reducers/rdcToast";
import ItemSeat from "./ItemSeat/ItemSeat";
import Spinner from "../../components/Spinner/Spinner";

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

const Home = () => {
  const { movieSlug } = useParams();
  const scrollRef = useRef(null);

  const [movie, setMovie] = useState(null);
  const { tickets } = useSelector((state) => state.rdcTicket);
  const { toast } = useSelector((state) => state.rdcToast);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Delete All tickets
  const handleDelAllTicket = () => {
    dispatch(delAllTicket());
  };

  // Add new ticket
  const handleAddTicket = (seat) => {
    const action = addTicket({
      seat,
    });
    dispatch(action);
  };

  // Direct
  const handleDirect = () => {
    navigate("/");
  };

  // Button Payment
  const handleBtnPayment = () => {
    let configToast = { ...toast };
    if (tickets.length) {
      configToast = {
        isShow: true,
        isSuccess: true,
        className: "bg-success",
        content: {
          title: "Thanh toán",
          message: "Thanh toán thành công",
        },
        callback: handleDirect,
      };
    } else {
      configToast = {
        isShow: true,
        isSuccess: false,
        className: "bg-danger",
        content: {
          title: "Thanh toán",
          message: "Vui long chọn vé",
        },
      };
    }

    dispatch(setConfig(configToast));
  };
  
  useEffect(() => {
    scrollRef.current.scrollIntoView();

    return () => {
      dispatch(delAllTicket());
    }
  }, [scrollRef, dispatch]);

  useEffect(() => {
    const fakeCallAPI = () => {
      let timeID = setTimeout(() => {
        const response = DataMovie.find((item) => item.slug === movieSlug);
        if (!response) navigate("/error", { replace: true });
        setMovie(response);
      }, 1500);

      return timeID;
    };

    let timeID = fakeCallAPI();

    return () => {
      // handleDelAllTicket();
      clearTimeout(timeID);
    };
  }, [movieSlug, navigate]);

  return (
    <div
      id="booking"
      ref={scrollRef}
      className="d-flex flex-column align-items-center min-vh-100 py-4"
    >
      {movie ? (
        <div className="container-lg">
          <div className="card">
            <div className="card-header text-center px-4">
              <h3 className="mb-0 py-2 py-md-3 fs-4">Booking Ticket</h3>
            </div>
            <div className="card-body bg-dark p-4">
              {/* Screen */}
              <div className="row justify-content-center mb-3 text-light">
                <span className="bg-light mb-1"></span>
                <p className="text-center text-uppercase mb-2">màn hình</p>
              </div>

              {/* Item seat */}
              <div className="mb-5">
                {rowsSeat.map((rowItem) => {
                  return (
                    <div key={rowItem.hang} className="row my-2 my-lg-3">
                      {rowItem.danhSachGhe.map((seat) => {
                        return (
                          <ItemSeat
                            key={seat.soGhe}
                            seat={seat}
                            handleAddTicket={handleAddTicket}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Description seat */}
              <div className="des-seat row justify-content-center mb-2">
                {infoSeat.map((item) => {
                  return (
                    <div key={item.id} className="d-flex align-items-center">
                      <span className={`me-2 ${item.className}`}></span>
                      <p className="text-white mb-0">{item.content}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="card-footer py-3">
              {/* Short info movie */}
              <div className="short-info border-bottom py-2 py-lg-3">
                <div className="d-flex align-items-center mb-1 mb-md-2">
                  <span
                    className={`px-2 px-lg-3 py-1 rounded-1 text-white me-2 cinema-rate-${movie.rateType?.toLowerCase()}`}
                  >
                    {movie.rateType}
                  </span>
                  <h5 className="fw-bold mb-0">{movie.title}</h5>
                </div>
                <p className="flex-grow-1 mb-0">{movie.showInfo}</p>
              </div>

              <div className="d-flex align-items-center justify-content-between border-bottom py-2 py-lg-3">
                <p className="col-4 mb-0">Chỗ ngồi</p>
                <div className="col-8 d-flex justify-content-end">
                  <div
                    className={`${
                      tickets.length ? "d-flex" : "invisible"
                    } align-items-center justify-content-between border border-1 rounded-2 px-2 px-md-3 py-1 py-md-2`}
                  >
                    <p className="flex-grow-1 mb-0 me-2">
                      {tickets.map((ticket) => ticket.soGhe).join(", ")}
                    </p>
                    <button
                      className="btn btn-danger rounded-circle"
                      onClick={handleDelAllTicket}
                    >
                      <div className="d-flex justify-content-center align-items-center py-1">
                        <i className="fa-solid fa-x fs-6"></i>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-stretch py-2 py-lg-3">
                <div className="col-4 fw-bold">
                  <p className="mb-1 mb-md-2">Tạm tính</p>
                  <p className="fs-6 mb-0">
                    {tickets.reduce(
                      (total, ticket) => (total += ticket.gia),
                      0
                    )}
                    đ
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
      ) : (
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Home;
