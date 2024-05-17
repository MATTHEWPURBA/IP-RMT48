import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../component/Cards";

export default function Homepage() {
  const [dataCuisine, setDataCuisine] = useState([]);
  // console.log("🚀 ~ Home ~ DataCuisine:", DataCuisine);
  const [dataCategory, setDataCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Category, setCategory] = useState(0);
  const [sort, setSort] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchCuisine = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:3000/pub/cuisine/",
        params: {
          search,
          sort,
          Category,
          page,
        },
      });

      setDataCuisine(response.data.data);

      // setTotalPages(Math.ceil(response.data.response.count / 9));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(dataCuisine, "apa nih");

  // const fetchCategories = async () => {
  //   try {
  //     const categories = await api.get("/pub/categories");
  //     const dataCategories = categories.data.categories;
  //     setDataCategory(dataCategories);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  const submitSearch = () => {
    if (page !== 1) {
      setPage(1);
    } else {
      fetchCuisine();
    }
  };

  useEffect(() => {
    fetchCuisine();
  }, [page, Category, sort]);

  return (
    <>
      {/* hero */}
      <div className="my-24 w-full">
        <div className="container mx-auto ">
          <div className=" max-w3xl mx-auto">
            <h1 className="font-extrabold text-4xl text-slate-800 text-center capitalize mb-6">welcome to our resto</h1>

            <p className="text-slate-500 font-normal text-center leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eligendi doloribus assumenda sapiente, aspernatur modi</p>

            <form className="flex items-center max-w-xl mx-auto my-7">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative flex-initial w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search your favourit cuisine..."
                  required=""
                />
              </div>
              <div className="px-2 flex-none">
                <button
                  id="dropdownCheckboxButton"
                  data-dropdown-toggle="dropdownDefaultCheckbox"
                  className="text-white bg-slate-800 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Category
                  <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                  </svg>
                </button>

                {/* Dropdown menu */}
                <div id="dropdownDefaultCheckbox" className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
                    <li>
                      <div className="flex items-center">
                        <input
                          id="checkbox-item-1"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label htmlFor="checkbox-item-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Default checkbox
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <input
                          defaultChecked=""
                          id="checkbox-item-2"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label htmlFor="checkbox-item-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Checked state
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <input
                          id="checkbox-item-3"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label htmlFor="checkbox-item-3" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Default checkbox
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <button
                type="submit"
                className="p-2.5 ms-2 text-sm font-medium text-white bg-slate-600 rounded-lg border border-slate-700 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>
            {/* ini untuk search and filter */}

            {/* ini buat category sorting */}
            <div className="container px-10 mx-0 min-w-full flex flex-col items-center">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-slate-900 bg-white border border-slate-800 hover:bg-slate-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Sort By Category
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                </svg>
              </button>
              {/* Dropdown menu */}
              <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Rendang
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Tempe
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Pencuci Mulut
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Makanan Utama
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* hero end */}

      {/* Content */}
      <div className="py-12 bg-slate-100 mx-auto">
        <div className="container mx-auto">
          <div className="mb=8">
            <h3 className="font-semibold text-2xl text-slate-800 text-center capitalize mb-1">Popular Cuisine</h3>
            <p className="text-slate-500 text-center">Explore our menu</p>
          </div>

          <div className="grid grid-cols-12 gap-4 py-8">
            {dataCuisine.map((dataCuisine) => {
              return <Cards dataCuisine={dataCuisine} key={dataCuisine.id} />;
            })}
          </div>
        </div>
      </div>
      {/* Content end*/}
    </>
  );
}
