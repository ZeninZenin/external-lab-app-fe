import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './app/App.component';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import { AppContextProvider } from './context';
localStorage.setItem(
  'token',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IlplbmluWmVuaW4iLCJpc0xvY2tlZCI6ZmFsc2UsInJvbGVzIjpbImFkbWluIl0sImZpcnN0TmFtZSI6ItCh0LXRgNCz0LXQuSIsImdpdGh1Yk5hbWUiOiJTZXJnZXkgWmVuaW4iLCJsYXN0TmFtZSI6ItCX0LXQvdC40L0iLCJpYXQiOjE2NDU1MTI5NTMsImV4cCI6MTY0NTU5OTM1M30.fhknNiL-2QgnxMTw4uD7efA1gOXfbeDMcPfqblBe7W8',
);
ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
