import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const registerSchema = z.object({
  username: z.string().min(1, "UserName is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  console.log(SERVER_URL);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const {
    mutate: registerUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (formData: RegisterFormData) => {
      const res = await axios.post(`${SERVER_URL}/api/auth/register`, formData);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Registration successful", data);
      navigate("/login", { replace: true });
    },
    onError: (error: any) => {
      console.error(
        "Registration failed:",
        error?.response?.data || error.message
      );
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-[#273366]">
          Register
        </h2>

        <div>
          <label className="block mb-1 text-sm font-medium">UserName</label>
          <input
            type="text"
            {...register("username")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#273366]"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#273366]"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#273366]"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-500 mt-4">
            {axios.isAxiosError(error)
              ? error.response?.data?.message || "Login failed"
              : "Login failed"}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#273366] text-white py-2 rounded-md hover:bg-[#1f2954] transition disabled:opacity-50 cursor-pointer"
        >
          {isPending ? "Registering..." : "Register"}
        </button>
        <div className={`text-center mt-4 text-gray-600  `}>
          Already have an account?{" "}
          <Link className="text-blue-500 hover:underline" to={"/login"}>
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
