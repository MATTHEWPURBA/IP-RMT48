import { Link } from "react-router-dom";
import Filter from "./sidebar/Filter";
import Menus from "./sidebar/Menus";
import Search from "./sidebar/Search";
import Sort from "./sidebar/Sort";

export default function Sidebar({ position, search, filter, sort }) {
  // console.log("🚀 ~ Sidebar ~ sort:", sort);
  const token = localStorage.getItem("token");

  return (
    <>
      <div className="flex flex-col gap-3">
        {token ? <Menus /> : null}
        {position === "home" ? (
          <div className="rounded-lg shadow-md bg-base-200">
            <div className="sidebar p-4">
              <Search
                search={search.search}
                setSearch={search.setSearch}
                submitSearch={search.submitSearch}
              />
              <Filter
                filter={filter.filter}
                setFilter={filter.setFilter}
                categories={filter.dataCategory}
              />
              <Sort setSort={sort} />
            </div>
          </div>
        ) : null}

        {position === "articles" ? (
          <div className="rounded-lg shadow-md bg-base-200">
            <Link to={"/create-article"} className="btn btn-secondary w-full">
              Add Article
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
}
