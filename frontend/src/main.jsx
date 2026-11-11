import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AppProvider from './hooks/index.jsx';
import { router } from './routes/index.jsx';
import GlobalStyles from './styles/globalStyles.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
      <GlobalStyles />
      <ToastContainer theme="colored" autoClose={2000} />
    </AppProvider>
  </StrictMode>
);
