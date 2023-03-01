const dbConn = require('../dbConnection');

const Order = function (order) {
  this.date = date;
  this.itemId = itemId;
  this.userId = userId;
  this.firstName = firstName;
  this.address = address;
};

Order.loadOrderDetails = (userId, res) => {
  dbConn.query(
    'SELECT * FROM order_table WHERE userId = ?',
    [userId],
    (err, dbRes) => {
      if (err) {
        res(null, err);
      } else {
        res(null, dbRes);
      }
    }
  );
};

module.exports = Order;
