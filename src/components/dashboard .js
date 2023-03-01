import { React, useEffect, useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Unauthorize from './unauthorize';
import Header from './header';
import Footer from './footer';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorizeLogin, setUnauthorizeLogin] = useState(false);
  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/item/dashboard', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
          setDataToDisplay(res.data.data);
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
                  console.log(item.itemName.toUpperCase());
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
          <div className="dashboard-main-outer">
            <div className="item-card-main-outer">
              {dataToDisplay.map((item) => {
                return (
                  <div
                    key={item.itemId}
                    className="item-card-outer"
                    onClick={() => navigate('/dashboard/' + item.itemId)}
                  >
                    <div className="item-card-pic-outer">
                      <img
                        className="item-card-pic"
                        src={require('../assets/' + item.itemPath)}
                        alt="pic"
                      />
                    </div>
                    <div className="item-card-name-outer">{item.itemName}</div>
                    <div className="item-container">
                      <span className="stock">
                        Items left : {item.itemQuantity}
                      </span>
                      <span className="price">${item.itemPrice}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Footer />
        </>
      );
    } else {
      if (unauthorizeLogin) {
        return <Unauthorize />;
      } else {
        return (
          <div className="server-error">
            <h2>server error</h2>
          </div>
        );
      }
    }
  }
};

export default Dashboard;
