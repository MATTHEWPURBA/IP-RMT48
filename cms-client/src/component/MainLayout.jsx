import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";


export default function MainLayout(params) {
  if (localStorage.role === "Admin") {
    return (
      <>
        {/* jadi intinya navbar ini akan jadi component yang akan 
            pasti selalu ada karena ditaro di mainLayout */}

        <NavbarAdmin />
        <Outlet />
        {/* outlet itu adalah nilai dari semua children yang ada
            di bawahnya mainLayout */}
      </>
    );
  } else {
    return (
      <>
        <Navbar />

        <Outlet />
      </>
    );
  }
}
