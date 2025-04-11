import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
// ✅ Zod Schema
const loginSchema = z.object({
  email: z.string().min(1, "email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// 🎯 React Hook Form + Zod
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post(`${SERVER_URL}/api/auth/login`, formData);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Login success:", data);
      navigate("/login-sucess", {
        replace: true,
        state: { email: data?.data?.email },
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log("Login failed:", error.response?.data || error.message);
      } else {
        console.log("Unexpected error:", error);
      }
    },
  });
  const onSubmit = (data: any) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm p-8 rounded-md shadow-sm"
      >
        <h2 className="text-center text-2xl font-semibold mb-6">
          Welcome back!
        </h2>

        <input
          type="text"
          placeholder="Enter Email Id"
          {...register("email")}
          className="w-full px-4 py-2 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mb-3">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Enter Password"
          {...register("password")}
          className="w-full px-4 py-2 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <p className="text-sm text-red-500 mb-4">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-[#273366] text-white py-2 rounded-md hover:bg-[#1f2954] transition disabled:opacity-50 cursor-pointer"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>

        {loginMutation.isError && (
          <p className="text-sm text-red-500 mt-4">
            {axios.isAxiosError(loginMutation.error)
              ? loginMutation.error.response?.data?.message || "Login failed"
              : "Login failed"}
          </p>
        )}

        <div className={`text-center mt-4 text-gray-60 `}>
          Don't have an account?{" "}
          <Link className="text-blue-500 hover:underline" to={"/register"}>
            sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// const loginSchema = z.object({
//   email: z
//     .string({ required_error: "Email is Required" })
//     .email("Invalid Email")
//     .min(1, "Email is required"),
//   password: z.string().min(6, "Password must be min 6 charactor"),
// });

// type LoginFormData = z.infer<typeof loginSchema>;

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = (data: LoginFormData) => {
//     console.log(data);

//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-white">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col gap-4 w-full max-w-xs"
//       >
//         <h2 className="text-xl font-semibold text-center mb-2">
//           Welcome back!
//         </h2>

//         <div>
//           <input
//             type="text"
//             placeholder="Email"
//             {...register("email")}
//             className="w-full border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.email && (
//             <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
//           )}
//         </div>

//         <div>
//           <input
//             type="password"
//             placeholder="Password"
//             {...register("password")}
//             className="w-full border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.password && (
//             <p className="text-sm text-red-500 mt-1">
//               {errors.password.message}
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="bg-[#273469] text-white py-2 rounded-md hover:bg-[#1e2a4f] transition"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
