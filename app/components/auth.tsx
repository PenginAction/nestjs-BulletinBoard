"use client";
import { getUserIdFromToken } from "@/utils/getUserId";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  
  async function auth(e: FormEvent) {
    e.preventDefault();
    if (isSignIn) {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_RESTAPI_URL}login`, {
          email,
          password,
        }, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setEmail("");
        setPassword("");
        if (res.data.error) {
          alert(res.data.error.message);
        } else {
          if (res.data.token) {
            // 今後cookieをnext/headerから取得するように変更する
            const options = {path: "/"};
            cookies.set("token", res.data.token, options);

            const userId = getUserIdFromToken(res.data.token);
            if (userId) {
              cookies.set("ID", userId, options);
            }
          }
          router.push("/home");
        }
      } catch (error: any) {
        alert(error.message);
      }
    } else {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_RESTAPI_URL}signup`, {
        user_str_id: username,
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUsername("");
      setEmail("");
      setPassword("");
      if (res.data.error) {
        alert(res.data.error.message);
      }
    }
  }
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-green-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {isSignIn ? "Sign in to your account" : "Create a new account"}
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={auth}
          className="space-y-6"
          action="#"
          method="POST"
        >
          {!isSignIn && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSignIn ? "Sign in" : "Sign up"}
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsSignIn(!isSignIn)}
            className="cursor-pointer font-semibold leading-6 text-gray-900 hover:text-gray-400"
          >
            {isSignIn ? "Create a new account" : "Sign in to your account"}
          </span>
        </p>
      </div>
    </div>
  );
}
