import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import showToast from "../../utils/toastify";
import { localRequest } from "../../utils/axios";

//
export default function CreateUser() {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const navigate = useNavigate();
  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };
  let token = localStorage.getItem("token");
  const errorHandler = async (event) => {
    event.preventDefault();
    try {
      let response = await localRequest({
        method: "post",
        url: "users/add-user",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: inputData,
      });
      navigate("/login");
      let { message } = response.data;
      showToast(message);
    } catch (error) {
      let { message } = error.response.data;
      showToast(message);
      console.log(error);
    }
  };

  return (
    <>
      <title>Add-User</title>
      <main className="flex justify-center items-center w-full min-h-screen bg-slate-900 text-white mx-auto">
        <section className="width-[30rem] w-full m-9 flex flex-col space-y-10">
          {/* tampilan login */}
          <div className="flex items-center justify-center mb-10">
            <span className="bg-blue-400 py-2 text-3xl font-medium px-3 rounded-tl-3xl">Add</span>
            <span className="border-y-4 border-blue-400 py-[4px] text-3xl font-medium rounded-br-3xl px-3">User</span>
          </div>

          {/* tampilan login end */}
          <form className="space-y-10" action="" onSubmit={errorHandler}>
            {/* username & passsword bar */}
            <div className="w-96 text-lg mx-auto border-b focus-within:border-blue-300 duration-500 transform">
              <input type="text" onChange={handleChangeInput} name="email" placeholder="Email" className="bg-transparent w-full border-none" />
            </div>
            <div className="w-96 text-lg mx-auto border-b focus-within:border-blue-300 duration-500 transform">
              <input type="text" onChange={handleChangeInput} name="username" placeholder="Username" className="bg-transparent w-full border-none" />
            </div>

            <div className="w-96 text-lg mx-auto border-b focus-within:border-blue-300 duration-500 transform">
              <input type="password" onChange={handleChangeInput} name="password" placeholder="Password" className="bg-transparent w-full border-none" />
            </div>
            {/* username & passsword bar end */}
            <button className="bg-blue-400 p-2 justify-center items-center w-96 hover:ring-blue-400 hover:bg-blue-500 rounded-lg flex mx-auto" type="submit">
              Add-User
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
