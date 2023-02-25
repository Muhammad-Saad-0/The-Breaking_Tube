import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Main/Home';
import Playlist from './Components/Playlist';

ReactDOM.createRoot(document.getElementById('root')).render(
 
  <React.StrictMode>
    <BrowserRouter>

   <App />
   </BrowserRouter>
  </React.StrictMode>

)
