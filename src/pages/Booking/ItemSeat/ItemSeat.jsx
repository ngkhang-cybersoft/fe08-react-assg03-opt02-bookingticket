import './ItemSeat.scss'

import { useSelector } from "react-redux";

const getStatusSeat = (seats, daDat, soGhe) => {
  if (daDat) return "block";
  return seats.findIndex((ticket) => ticket.soGhe === soGhe) !== -1
    ? "booking"
    : "empty";
};

const ItemSeat = (props) => {
  const { tickets } = useSelector((state) => state.rdcTicket);

  const { seat, handleAddTicket } = props;
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
};

export default ItemSeat;
