import { React, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';
import Unauthorize from './unauthorize';
import BadRequest from './bad_request';
import Header from './header';
import Footer from './footer';

const Item = () => {
  const id = useParams().id;
  const [data, setData] = useState([]);
  const [displayPurchaseForm, setDisplayPurchaseForm] = useState(false);
  const [quantity, setQuantity] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [unauthorizeLogin, setUnauthorizeLogin] = useState(false);
  const [result, setResult] = useState('');

  const navigate = useNavigate();

  const PurchaseForm = () => {
    const [firstName, setFirstName] = useState('');
    const [address, setAddress] = useState('');
    if (displayPurchaseForm) {
      return (
        <div className="purchase-form-outer">
          <div className="purchase-form">
            <div className="form">
              <div className="title">User details form</div>
              <label style={{ marginTop: '20px' }} htmlFor="f-name">
                First Name
              </label>
              <input
                type="text"
                placeholder="first-name :"
                id="f-name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <label htmlFor="address">Address</label>
              <input
                type="text"
                placeholder="address :"
                id="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <p style={{ marginTop: '20px', color: 'red' }}>{result}</p>
              <div className="purchase-form-button-outer">
                <button
                  className="purchase-btn"
                  onClick={() => {
                    axios
                      .get(
                        'http://localhost:4000/api/item/dashboard/buy/' + id,
                        {
                          params: {
                            firstName,
                            address,
                          },
                        }
                      )
                      .then((res) => {
                        if (res.data.err) {
                          setResult(
                            'All details should be filled before purchase'
                          );
                        } else {
                          setQuantity({
                            stock: quantity.stock - 1,
                            sold: quantity.sold + 1,
                          });
                          setDisplayPurchaseForm(false);
                          setResult('');
                        }
                      });
                  }}
                >
                  Purchase
                </button>
                <button
                  className="close-btn"
                  onClick={() => {
                    setDisplayPurchaseForm(false);
                    setResult('');
                  }}
                >
                  close form
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const DisplayContent = () => {
    if (quantity.stock <= 0) {
      return (
        <div className="out-of-stock-label">Item is currently out of stock</div>
      );
    } else {
      return (
        <div className="button-outer">
          <button
            className="btn-buy"
            onClick={() => setDisplayPurchaseForm(true)}
          >
            Buy it now
          </button>
          <button
            className="btn-cart"
            onClick={() => navigate('/shopping_history')}
          >
            Order History
          </button>
        </div>
      );
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/item/dashboard/' + id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
          setQuantity({
            stock: res.data.data[0].itemQuantity,
            sold: res.data.data[0].sold,
          });
        } else {
          if (res.data.err === 'unauthorize access') {
            setUnauthorizeLogin(true);
          } else {
            console.log(res.data.data);
            setData([]);
          }
        }
      })
      .catch((err) => {
        setError(true);
      })
      .finally((res) => {
        setLoading(false);
      });
  }, [id]);

  if (!loading) {
    if (data.length > 0) {
      return (
        <>
          <Navbar />
          <Header />
          <div className="item-main-outer">
            <div className="item-pic-outer">
              <img src={require('../assets/' + data[0].itemPath)} alt="item" />
              <div className="item-name">{data[0].itemName}</div>
            </div>
            <div className="item-des-outer">
              <div className="item-title-outer">
                <div className="item-full-name">{data[0].itemFullName}</div>
                <div className="item-sold">
                  items sold :{' '}
                  <span className="item-count">{quantity.sold}</span>
                </div>
              </div>
              <div className="item-price-outer">
                <b>$</b> <span className="price">{data[0].itemPrice}</span> /
                Approximately <b>LKR</b> : &nbsp;
                <span className="price">{data[0].itemPrice * 355 + '.00'}</span>
              </div>
              <div className="button-outer">
                <DisplayContent />
                <PurchaseForm />
                <div className="remaining">
                  Item remaining : {quantity.stock}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      );
    } else {
      if (error) {
        return (
          <div className="server-error">
            <h2>Internal server error</h2>
            <h3>please try again in few minutes</h3>
          </div>
        );
      } else {
        if (unauthorizeLogin) {
          return <Unauthorize />;
        } else {
          return (
            <>
              <Navbar />
              <BadRequest />
            </>
          );
        }
      }
    }
  }
};

export default Item;
