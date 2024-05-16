import { Link } from "react-router-dom";

export default function Cards({ dataCuisine }) {
  return (
    <>
      {/* card */}

      <div className="col-span-3 bg-white rounded-sm overflow-hidden">
        <div className="w-full h-48 bg-red-300 mb-3">
          <Link to={`/cuisine/${dataCuisine.id}`}>
            <img src={dataCuisine.imgUrl} className="w-full h-full bg-cover" alt="" />
          </Link>
        </div>
        <div className="px-4 pb-6">
          <div className="mb-7">
            <h1 className="font-bold text-slate-800 mb-2">{dataCuisine.name}</h1>
            <p className="text-sm"> {dataCuisine.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="card-actions"></div>

            <Link
              type="button"
              to={`cuisine/${dataCuisine.id}`}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 
              focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              See Details
            </Link>
          </div>
        </div>
      </div>
      {/* // card end */}
    </>
  );
}
