// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from './router/index.tsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <>
    <Toaster position="top-center" />
    {/* <StrictMode> */}
    <AppRouter />
    {/* </StrictMode> */},
  </>,
);
