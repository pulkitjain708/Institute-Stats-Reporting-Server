module.exports = () => {
  return function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = 1 + date.getMonth();
    var d = date.getDate();
    var format = `${year}-${month}-${d}`;
    return format;
  };
};
