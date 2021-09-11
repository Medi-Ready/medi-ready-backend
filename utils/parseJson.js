exports.parse = (payload) => {
  return payload
    .slice(1, -1)
    .split(", ")
    .map((item) => item.slice(1, -1));
};
