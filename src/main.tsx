// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import AppRouter from './router/index.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <>
    <Toaster position="top-center" />
    {/* <StrictMode> */}
    <AppRouter />
    {/* </StrictMode> */},
  </>,
);
