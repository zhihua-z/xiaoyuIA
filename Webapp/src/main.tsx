import { StrictMode, createContext, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import DiscoveryPage from './pages/DiscoveryPage'
import TaskPage from './pages/TaskPage'
import PostPage from './pages/postPage'
import DashboardPage from './pages/DashboardPage'
import SettingPage from './pages/SettingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CreateUserPage from './pages/CreateUserPage'
import MePage from './pages/MePage'
import CreateTaskPage from './pages/CreateTaskPage'

import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom"



const router = createBrowserRouter([
    {
        path: "/discovery",
        element: <DiscoveryPage />
    },
    {
        path: "/task",
        element: <TaskPage />
    },
    {
        path: "/detail",
        element: <PostPage />
    },
    {
        path: "/dashboard",
        element: <DashboardPage />
    },
    {
        path: "/setting",
        element: <SettingPage />
    },
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/signup",
        element: <SignupPage />
    },
    {
        path: "/createuser",
        element: <CreateUserPage />
    },
    {
        path: "/me",
        element: <MePage />
    },
    {
        path: "/createtask",
        element:<CreateTaskPage />
    }
])

export const AppContext = createContext([]);

export const AppContextProvider = ({ children }: {children: ReactElement}) => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')

    return (
        <AppContext.Provider value={{ email, setEmail, username, setUsername }}>
            {children}
        </AppContext.Provider>
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppContextProvider>
            <RouterProvider router={router} />
        </AppContextProvider>
    </StrictMode>,
)
