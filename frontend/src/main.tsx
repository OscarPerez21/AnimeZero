import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from "react-router-dom";

import './styles/index.css'
import './styles/Poppins.css'

import App from './App'
import SelectedAnime from './pages/SelectedAnime'
import AddNewAnime from './pages/AddNewAnime';
import WatchEpisode from './pages/WatchEpisode';

const router = createBrowserRouter([
  { path: "/", element: <App />, },
  { path: "/AnimeSelected", element: <SelectedAnime />, },
  { path: "/AddAnime", element: <AddNewAnime />, },
  { path: "/WatchEpisode", element: <WatchEpisode />, },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
