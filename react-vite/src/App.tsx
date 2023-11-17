/** @format */

import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
