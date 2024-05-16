import { useEffect, useId, useState } from "react";

import Cards from "./Cards";
import { localRequest } from "../utils/axios";

export default function Content({}) {
  const id = useId();

  const [dataCuisine, setDataCuisine] = useState([]);
  const fetchData = async () => {
    try {
      const {
        data: { data },
      } = await localRequest({
        method: "get",
        url: "/pub/cuisine",
      });
      setDataCuisine(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* Content */}
      <div className="py-12 bg-slate-100 mx-auto">
        <div className="container mx-auto">
          <div className="mb=8">
            <h3 className="font-semibold text-2xl text-slate-800 capitalize mb-1">Popular Cuisine</h3>
            <p className="text-slate-500">Explore our menu</p>
          </div>

          <div className="grid grid-cols-12 gap-4 py-8">
            {dataCuisine.map((dataCuisine) => {
              return <Cards dataCuisine={dataCuisine} key={dataCuisine.id} fetchData={fetchData} />;
            })}
          </div>
        </div>
      </div>
      {/* Content end*/}
    </>
  );
}
