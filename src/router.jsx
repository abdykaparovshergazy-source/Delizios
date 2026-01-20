import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import Menu from "./components/menu/Menu";
import About from "./components/about us/About";
import Contact from "./components/contact us/Contact";
import Reservation from "./components/reservation/reservation1/Reservation1";

export const myRouter = (cartItems, setCartItems, user, handleLogin, handleLogout) =>
  createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout 
          cartItems={cartItems} 
          setCartItems={setCartItems}
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      ),
      children: [
        {
          index: true,
          element: (
            <Home 
              cartItems={cartItems} 
              setCartItems={setCartItems} 
            />
          ),
        },
        {
          path: "menu",
          element: (
            <Menu 
              cartItems={cartItems} 
              setCartItems={setCartItems} 
            />
          ),
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "reservation",
          element: <Reservation />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        // Login компонентти эгерде бөлүм катары керек болсо (опционалдуу)
        // {
        //   path: "login",
        //   element: <Login open={true} onClose={() => window.history.back()} onLogin={handleLogin} />,
        // },
      ],
    },
  ]);