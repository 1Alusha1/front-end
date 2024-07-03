import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./views/Main";
import Cart from "./views/Cart";
import ContactInfo from "./views/ContactInfo";
import ShipmentInfo from "./views/ShipmentInfo";
import SuccessOrder from "./views/SuccessOrder";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" index element={<Main />} />
        <Route path="/cart" index element={<Cart />} />
        <Route path="/contact-information" index element={<ContactInfo />} />
        <Route path="/shipment-information" index element={<ShipmentInfo />} />
        <Route path="/success" index element={<SuccessOrder />} />
      </Routes>
    </>
  );
}

export default App;
