import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;

    if (type === "signup") {
      setSignupInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setLoginInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRegistration = async (type) => {
    const inputData =
      type === "signup"
        ? {
            name: signupInput.name,
            email: signupInput.email,
            password: signupInput.password,
            role: signupInput.role,
          }
        : {
            email: loginInput.email,
            password: loginInput.password,
          };

    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
      setSignupInput({
        name: "",
        email: "",
        password: "",
        role: "student",
      });
      setIsSignUpMode(false);
    }

    if (registerError) {
      toast.error(registerError.data?.message || "Signup Failed");
    }

    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");

      const userRole = loginData?.user?.role;

      if (userRole === "instructor") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }

    if (loginError) {
      toast.error(loginError.data?.message || "Login Failed");
    }
  }, [
    registerIsSuccess,
    registerData,
    registerError,
    loginIsSuccess,
    loginData,
    loginError,
    navigate,
  ]);

  return (
    <div className="min-h-screen flex justify-center items-center p-8 bg-[#D9EAFD] dark:bg-[oklch(0.129_0.042_264.695)] -mt-8">
      <div className="group relative">
        <div className="w-[26rem] bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:shadow-2xl">
          {isSignUpMode ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegistration("signup");
              }}
              className="flex flex-col"
              noValidate
            >
              <h2 className="text-center text-2xl font-semibold mb-6 text-[#00008A] dark:text-white">
                Sign Up
              </h2>

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={signupInput.name}
                onChange={(e) => changeInputHandler(e, "signup")}
                required
                className="mb-4 w-full rounded-md bg-white text-[#2b3c50] placeholder-[#8c9ba0]
                border border-[#d5e9e2] focus:border-[#2b3c50] focus:outline-none
                focus:ring-1 focus:ring-[#2b3c50] transition px-4 py-3"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signupInput.email}
                onChange={(e) => changeInputHandler(e, "signup")}
                required
                autoComplete="off"
                className="mb-4 w-full rounded-md bg-white text-[#2b3c50] placeholder-[#8c9ba0]
                border border-[#d5e9e2] focus:border-[#2b3c50] focus:outline-none
                focus:ring-1 focus:ring-[#2b3c50] transition px-4 py-3"
              />

              <div className="mb-4">
                <p className="mb-2 text-sm font-medium text-[#2b3c50] dark:text-white">
                  Select Role
                </p>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setSignupInput((prev) => ({
                        ...prev,
                        role: "student",
                      }))
                    }
                    className={`flex-1 py-2 rounded-md border font-medium transition ${
                      signupInput.role === "student"
                        ? "bg-[#00008A] text-white border-[#00008A]"
                        : "bg-white text-[#2b3c50] border-[#d5e9e2]"
                    }`}
                  >
                    Student
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSignupInput((prev) => ({
                        ...prev,
                        role: "instructor",
                      }))
                    }
                    className={`flex-1 py-2 rounded-md border font-medium transition ${
                      signupInput.role === "instructor"
                        ? "bg-[#00008A] text-white border-[#00008A]"
                        : "bg-white text-[#2b3c50] border-[#d5e9e2]"
                    }`}
                  >
                    Instructor
                  </button>
                </div>
              </div>

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupInput.password}
                onChange={(e) => changeInputHandler(e, "signup")}
                required
                autoComplete="new-password"
                className="mb-6 w-full rounded-md bg-white text-[#2b3c50] placeholder-[#8c9ba0]
                border border-[#d5e9e2] focus:border-[#2b3c50] focus:outline-none
                focus:ring-1 focus:ring-[#2b3c50] transition px-4 py-3"
              />

              <button
                type="submit"
                disabled={registerIsLoading}
                className="w-full bg-[#00008A] hover:bg-[#1e2a38] disabled:opacity-70 disabled:cursor-not-allowed
                text-white font-semibold py-3 rounded-md flex justify-center items-center transition"
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={16} />
                    Please wait...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>

              <p className="mt-4 text-center text-sm text-[#8c9ba0]">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUpMode(false)}
                  className="text-[#00008A] font-semibold hover:underline dark:text-white"
                >
                  Sign in here
                </button>
              </p>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegistration("login");
              }}
              className="flex flex-col"
              noValidate
            >
              <h2 className="text-center text-2xl font-semibold mb-6 dark:text-white text-[#00008A]">
                Sign In
              </h2>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginInput.email}
                onChange={(e) => changeInputHandler(e, "login")}
                required
                autoComplete="off"
                className="mb-4 w-full rounded-md bg-white text-[#2b3c50] placeholder-[#8c9ba0]
                border border-[#d5e9e2] focus:border-[#2b3c50] focus:outline-none
                focus:ring-1 focus:ring-[#2b3c50] transition px-4 py-3"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginInput.password}
                onChange={(e) => changeInputHandler(e, "login")}
                required
                autoComplete="new-password"
                className="mb-6 w-full rounded-md bg-white text-[#2b3c50] placeholder-[#8c9ba0]
                border border-[#d5e9e2] focus:border-[#2b3c50] focus:outline-none
                focus:ring-1 focus:ring-[#2b3c50] transition px-4 py-3"
              />

              <button
                type="submit"
                disabled={loginIsLoading}
                className="w-full bg-[#00008A] hover:bg-[#1e2a38] disabled:opacity-70 disabled:cursor-not-allowed
                text-white font-semibold py-3 rounded-md flex justify-center items-center transition"
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={16} />
                    Please wait...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <p className="mt-4 text-center text-sm text-[#8c9ba0]">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUpMode(true)}
                  className="text-[#00008A] font-semibold hover:underline dark:text-white"
                >
                  Sign up here
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;