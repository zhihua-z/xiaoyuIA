import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import DiscoveryPage from './pages/DiscoveryPage'
import HelloPage from './pages/HelloPage'
import PostPage from './pages/postPage'
import DashboardPage from './pages/DashboardPage'
import SettingPage from './pages/SettingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CreateUserPage from './pages/CreateUserPage'
import MessagePage from './pages/MessagePage'
import MePage from './pages/MePage'

import{
 createBrowserRouter,
 RouterProvider
}from "react-router-dom"



const router = createBrowserRouter([
  {
    path: "/discovery",
    element: <DiscoveryPage />
  },
  {
    path: "/task",
    element: <HelloPage />
  },
  {
    path: "/detail",
    element: <PostPage />
  },
  {
    path: "/dashboard",
    element: <DashboardPage/>
  },
  {
    path: "/setting",
    element: <SettingPage/>
  },
  {
    path: "/",
    element: <LoginPage/>
  },
  {
    path: "/signup",
    element: <SignupPage/>
  },
  {
    path: "/createuser",
    element: <CreateUserPage/>
  },
  {
    path: "/messages",
    element: <MessagePage/>
  },
  {
    path: "/me",
    element: <MePage/>
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
