import { HomePage } from './pages/home-page'
import { MainApp } from './pages/main-app'
import { Login } from './pages/login'
import { Signup } from './pages/signup'
export default [
    {
        path: '/board/:id',
        element: <MainApp />,
    },
    {
        path: '/board',
        element: <MainApp />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/',
        element: <HomePage />,
    },

]
