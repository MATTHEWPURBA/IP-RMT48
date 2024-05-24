import { Link, useNavigate } from "react-router-dom";
const navigate = useNavigate()

export default function NavbarAdmin({}) {
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login")
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="py-2 bg-slate-50">
        <div className="container mx-auto  px-4">
          <div className="grid grid-cols-12 justify-between items-center">
            <div className="col-span-3 ">
              <h2 className="text-3xl font-bold capitalize text-start">resto bahariew</h2>
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
                <li>
                  <Link to={"/create-user"} className="text-lg font-normal capitalize text-slate-800">
                    Add User
                  </Link>
                </li>
                {/* kalau mau tambah menu di navbar tambahin disini */}
              </ul>
            </div>
            {/* ini adalah navbar bagian tengah end */}
            {/* ini adalah navbar bagian kanan */}
            <div className="col-span-3">
              <div className="flex gap-3 items-center justify-end">
                <form className="max-w-lg mr-1">
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block px-7 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search Cuisine"
                      required=""
                    />
                    <button
                      type="submit"
                      className="text-white absolute end-2.5 bottom-1.5 bg-slate-800 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Search
                    </button>
                  </div>
                </form>
                <a href="" onClick={handleLogOut} className="font-semibold capitalize text-sm bg-slate-800 rounded-md text-white py-2 px-6 ">
                  LogOut
                </a>
              </div>
            </div>
            {/* ini adalah navbar bagian kanan end */}
          </div>
        </div>
      </div>
    </>
  );
}
