'use client';

import { ToastContainer } from 'react-toastify';

export default function Toast() {
  return <ToastContainer position="top-right" autoClose={2000} closeOnClick pauseOnHover />;
}
