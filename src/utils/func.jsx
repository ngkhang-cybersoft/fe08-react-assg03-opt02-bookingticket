const getTotalPriceAndFormat = (tickets) => {
  let total = tickets.reduce((total, ticket) => (total += ticket.gia), 0);
  return new Intl.NumberFormat("vn-VN").format(total);
};

export { getTotalPriceAndFormat };