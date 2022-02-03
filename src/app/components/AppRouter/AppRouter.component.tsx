import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const AppRouter: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route
        path="login"
        element={
          <a href="https://github.com/login/oauth/authorize?client_id=9d92173bd56c03267935">
            Login with Github
          </a>
        }
      />
      <Route path="oauth">
        <Route path="github/callback" element={<button>OK</button>} />
      </Route>
      <Route path="*" element={<h1>There&apos;s nothing here!</h1>} />
    </Routes>
  </BrowserRouter>
);
