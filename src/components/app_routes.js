import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BadRequest from './bad_request';
import Dashboard from './dashboard ';
import Item from './Item';
import LogIn from './log_in';
import SoppingHistory from './shopping_history';
import SignIn from './sign_in';
import SignOut from './sign_out';

const AppRouts = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/sign_out" element={<SignOut />} />
          <Route path="/shopping_history" element={<SoppingHistory />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:id" element={<Item />} />
          <Route path="*" element={<BadRequest />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouts;
