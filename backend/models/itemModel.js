const dbConn = require('../dbConnection');

const Item = function (item) {
  this.itemName = itemName;
  this.itemPath = itemPath;
  this.itemQuantity = itemQuantity;
  this.itemPrice = itemPrice;
};

Item.loadPostsData = (res) => {
  dbConn.query('SELECT * FROM item', (err, dbRes) => {
    if (err) {
      res(null, err);
    } else {
      res(null, dbRes);
    }
  });
};

Item.loadPost = (id, res) => {
  dbConn.query('SELECT * FROM item WHERE itemId = ?', [id], (err, dbRes) => {
    if (err) {
      res(null, err);
    } else {
      res(null, dbRes);
    }
  });
};

Item.updateStockCount = (itemId, userId, query, res) => {
  dbConn.query(
    'UPDATE item SET itemQuantity = itemQuantity - 1, sold = sold + 1 WHERE itemId = ?',
    [itemId],
    (err, dbRes) => {
      if (err) {
        res(null, err);
      } else {
        dbConn.query(
          'SELECT itemPath, itemPrice, itemName FROM item WHERE itemId = ?',
          [itemId],
          (err, dbRes) => {
            if (err) {
              console.log('err');
              res(null, err);
            } else {
              {
                const date =
                  new Date().getFullYear() +
                  '-' +
                  new Date().getMonth() +
                  '-' +
                  new Date().getDate();

                dbConn.query(
                  'INSERT INTO order_table SET ? ',
                  [
                    {
                      date: date,
                      firstName: query.firstName,
                      address: query.address,
                      path: dbRes[0].itemPath,
                      itemName: dbRes[0].itemName,
                      itemPrice: dbRes[0].itemPrice,
                      itemId: itemId,
                      userId: userId,
                    },
                  ],
                  (err, dbRes) => {
                    if (err) {
                      res(null, err);
                    } else {
                      res(null, dbRes);
                    }
                  }
                );
              }
            }
          }
        );
      }
    }
  );
};

module.exports = Item;
