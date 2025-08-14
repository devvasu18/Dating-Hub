import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Toast styles
import { ToastContainer } from 'react-toastify';

// ✅ Font Awesome should be added in public/index.html, not here!

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <>
      <App />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  </React.StrictMode>
);

// Optional: performance logging
reportWebVitals();
