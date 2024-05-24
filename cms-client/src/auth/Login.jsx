import axios from "axios";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import { localRequest } from "../../utils/axios";
import showToast from "../../utils/toastify";

export default function Login({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleCredentialResponse(response) {
    try {
      // console.log("Encoded JWT ID token: " + response.credential);
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3000/user/google-login",
        headers: {
          google_token: response.credential,
        },
      });

      console.log(data.access_token, "ini akses");
      localStorage.setItem("token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.onload = function () {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE,
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    };
  }, []);

  const submitLogin = async (event) => {
    event.preventDefault();
    try {
      console.log("lempar prop");

      let { data } = await localRequest({
        method: "post",
        url: "/users/login",
        data: {
          email: email,
          password: password,
        },
      });

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);
      console.log(localStorage, "ini dari localstorage");
      console.log(data.access_token, "ini akses token dari login");
      navigate("/");
      // changePage("add");
    } catch (error) {
      let { message } = error.response.data;
      // console.log(message, "<<<<<ini udah di object");
      console.log(error);
      showToast(message);
    }
  };

  return (
    <>
      <title>Login</title>
      <main className="flex justify-center items-center w-full min-h-screen bg-slate-900 text-white mx-auto">
        <section className="width-[30rem] w-full m-9 flex flex-col space-y-10">
          {/* tampilan login */}
          <div className="flex items-center justify-center mb-10">
            <span className="bg-blue-400 py-2 text-3xl font-medium px-3 rounded-tl-3xl">Log</span>
            <span className="border-y-4 border-blue-400 py-[4px] text-3xl font-medium rounded-br-3xl px-3">In</span>
          </div>

          {/* tampilan login end */}
          <form className="space-y-10" action="" onSubmit={submitLogin}>
            {/* username & passsword bar */}
            <div className="w-96 text-lg mx-auto border-b focus-within:border-blue-300 duration-500 transform">
              <input
                type="text"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                name="email"
                placeholder="Email"
                className="bg-transparent w-full border-none"
              />
            </div>
            <div className="w-96 text-lg mx-auto border-b focus-within:border-blue-300 duration-500 transform">
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} name="password" placeholder="Password" className="bg-transparent w-full border-none" />
            </div>
            {/* username & passsword bar end */}
            <button className="bg-blue-400 p-2 justify-center items-center w-96 hover:ring-blue-400 hover:bg-blue-500 rounded-lg flex mx-auto" type="submit">
              Log In
            </button>
            <div className="w-96 mx-auto" id="buttonDiv"></div>
          </form>
        </section>
      </main>
    </>
  );
}
