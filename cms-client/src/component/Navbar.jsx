import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({}) {
  let [token, setToken] = useState(localStorage.token);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="py-2 bg-slate-50">
        <div className="container mx-auto  px-4">
          <div className="grid grid-cols-12 justify-between items-center">
            <div className="col-span-3 ">
              <h2 className="text-3xl font-bold capitalize text-start">Chicken Foodie</h2>
            </div>
            <div className="col-span-6 ">
              <ul className="flex flex-wrap space-x-12 justify-center">
                <li>
                  <Link to={"/"} className="text-lg font-normal capitalize text-slate-800">
                    Home
                  </Link>
                </li>
                <li>
                  <a href="" className="text-lg font-normal capitalize text-slate-800">
                    Cuisine
                  </a>
                </li>
                <li>
                  <a href="" className="text-lg font-normal capitalize text-slate-800">
                    Category
                  </a>
                </li>
                <li>
                  <Link to={"/form-page"} className="text-lg font-normal capitalize text-slate-800">
                    Add Cuisine
                  </Link>
                </li>
                {/* kalau mau tambah menu di navbar tambahin disini */}
              </ul>
            </div>
            {/* ini adalah navbar bagian tengah end */}
            {/* ini adalah navbar bagian kanan */}
            <div className="col-span-3">
              <div className="flex gap-3 items-center justify-end">
                
                {token ? (
                  <Link onClick={handleLogOut} className="font-semibold capitalize text-sm bg-slate-800 rounded-md text-white py-2 px-6">
                    Logout
                  </Link>
                ) : (
                  <Link to={"/login"} className="font-semibold capitalize text-sm bg-slate-800 rounded-md text-white py-2 px-6">
                    Login
                  </Link>
                )}
              </div>
            </div>
            {/* ini adalah navbar bagian kanan end */}
          </div>
        </div>
      </div>
    </>
  );
}
