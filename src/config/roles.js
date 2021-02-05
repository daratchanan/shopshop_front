import Home from "../containers/pages/Home/Home"
import Cart from "../containers/pages/Cart/Cart";
import InputProduct from "../containers/pages/InputProduct/InputProduct";
import Login from "../containers/pages/Login/Login";
import Register from "../containers/pages/Register/Register";

const components = {
   home: {
      path: "/",
      page: Home
   },
   register: {
      path: "/register",
      page: Register
   },
   login: {
      path: "/login",
      page: Login
   },
   cart: {
      path: "/cart",
      page: Cart
   },
   inputproduct: {
      path: "/inputproduct",
      page: InputProduct
   },
};

   const roles = {
      GUEST: [
         components.home,
         components.register,
         components.login,
         components.inputproduct,
      ],
      USER: [
         components.home,
         components.register,
         components.login,
         components.cart,
         components.inputproduct,
      ],
   };

export default roles;