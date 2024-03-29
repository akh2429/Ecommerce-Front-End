import "./app.css";
import Navbar from "./Components/Header/Navbar/Navbar";
import LandingPage from "./Pages/LandingPage/landingPage";
import ProductLanding from "./Pages/Productslanding/product";
import FinalCheckout from "./Pages/FinalCheckoutpage/finalcheckout";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/Login";
import { Provider } from "react-redux";
import store from "./Components/Redux/Store";
import Signup from "./Pages/Signup page/Signupage";
import PrivateComponent from "./Components/PrivateComponent/privateComponent";
import Cart from "./Pages/Cartpage/Cart";
import Footer from "./Components/Footer/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserVisit from "./Pages/userVisitPage/userVisit";

function App() {
  return (
    <Provider store={store} >
      <Navbar />
      <Routes>
        <Route element={<PrivateComponent />} >
          <Route path="/" element={<LandingPage />} />
          <Route path="/finalCheckout" element={<FinalCheckout />} />
          <Route path="/ProductLanding" element={<ProductLanding />} />
          <Route path="/cartpage" element={<Cart />} />
          <Route path="/userVisit" element={<UserVisit />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes >
      <Footer />
      <ToastContainer position='bottom-left' />
    </Provider>
  )
}

export default App;
