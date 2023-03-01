import React, { useEffect, useState } from 'react';
import Header from './header';
import Navbar from './navbar';
import Footer from './footer';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Unauthorize from './unauthorize';

const SoppingHistory = () => {
  const [data, setData] = useState([]);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [unauthorizeLogin, setUnauthorizeLogin] = useState(false);
  const navigate = useNavigate();
  const [emptyOrderList, setEmptyOrderList] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/order/getOrders', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            setData(res.data.data);
            setDataToDisplay(res.data.data);
          } else {
            setEmptyOrderList(true);
          }
        } else {
          if (res.data.err === 'unauthorize access') {
            setUnauthorizeLogin(true);
          }
        }
      })
      .catch((err) => {
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (!loading) {
    if (data.length > 0) {
      return (
        <>
          <Navbar />
          <Header />
          <input
            type="text"
            className="search-item"
            onChange={(e) => {
              setSearchText(e.target.value);

              if (e.target.value.trim() === '') {
                setDataToDisplay(data);
              } else {
                const tempArray = data.filter((item) => {
                  return item.itemName
                    .toLowerCase()
                    .startsWith(e.target.value.toLocaleLowerCase());
                });
                setDataToDisplay(tempArray);
              }
            }}
            value={searchText}
            placeholder="Search an item..."
          />

          <div className="purchased-items-table-col-names">
            <span className="item-number">Num</span>
            <span className="item-name">Item Name</span>
            <span className="buyer">Buyer</span>
            <span className="address">Address</span>
            <span className="purchased-date">Purchased Date</span>
            <span className="price">Price</span>
            <span className="buy">Buy</span>
          </div>
          <div className="data-row-container">
            {dataToDisplay.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{ color: 'black', fontWeight: 'bold' }}
                  className="data-row"
                >
                  <span className="item-number">{index + 1}</span>
                  <span className="item-name">{item.itemName}</span>
                  <span className="buyer">{item.firstname}</span>
                  <span className="address">{item.address}</span>
                  <span className="purchased-date">
                    {item.date.split('T')[0]}
                  </span>
                  <span style={{ color: 'red' }} className="price">
                    $ {item.itemPrice}
                  </span>
                  <span className="btn-outer">
                    <button
                      className="buy-btn"
                      onClick={() => navigate('/dashboard/' + item.itemId)}
                    >
                      Buy
                    </button>
                  </span>
                </div>
              );
            })}
          </div>
          <Footer />
        </>
      );
    } else {
      if (unauthorizeLogin) {
        return <Unauthorize />;
      } else {
        if (emptyOrderList) {
          return (
            <>
              <Navbar />
              <Header />
              <input
                type="text"
                className="search-item"
                onChange={(e) => {
                  setSearchText(e.target.value);

                  if (e.target.value.trim() === '') {
                    setDataToDisplay(data);
                  } else {
                    const tempArray = data.filter((item) => {
                      return item.itemName
                        .toLowerCase()
                        .startsWith(e.target.value.toLocaleLowerCase());
                    });
                    setDataToDisplay(tempArray);
                  }
                }}
                value={searchText}
                placeholder="Search an item..."
              />

              <div className="purchased-items-table-col-names">
                <span className="item-number">Num</span>
                <span className="item-name">Item Name</span>
                <span className="buyer">Buyer</span>
                <span className="address">Address</span>
                <span className="purchased-date">Purchased Date</span>
                <span className="price">Price</span>
                <span className="buy">Buy</span>
              </div>
              <div className="data-row-container" style={{ marginTop: '90px' }}>
                You haven't purchased any items yet.
              </div>
              <Footer />
            </>
          );
        } else {
          return (
            <div className="server-error">
              <h2>server error</h2>
            </div>
          );
        }
      }
    }
  }
};

export default SoppingHistory;
