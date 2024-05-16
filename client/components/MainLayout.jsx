import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";


export default function MainLayout(params) {
  
    return (
      <>
        <Navbar />

        <Outlet />
      </>
    );
}
