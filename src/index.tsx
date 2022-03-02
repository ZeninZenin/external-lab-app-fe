import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './app/App.component';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import { AppContextProvider } from './context';
import { AxiosInterceptors } from './axios';
import { getJWTPayload } from './utils';

const user = getJWTPayload(localStorage.getItem('token'))?.user;
const isGuest = user?.roles?.includes('guest');

if (isGuest) {
  window.addEventListener('unload', () => localStorage.removeItem('token'));
}

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
      <AxiosInterceptors />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
