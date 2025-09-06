import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/authSchema";
import { useLogin } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Github, Mail, Lock, ArrowRight, Chrome } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await loginMutation.mutateAsync(data);
      toast.success("Logged in successfully!");
      navigate("/project");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      {/* Background wave layers */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-blue-300/40 clip-path-wave-1" />
      <div className="absolute bottom-0 left-0 w-full h-[60vh] bg-blue-500/30 clip-path-wave-2" />

      {/* Login Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl p-8 relative z-10 border border-gray-200 clip-path-card-wave">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Welcome back to ProjectFlow
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Log in to continue managing your projects
        </p>

        {/* OAuth Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button className="flex items-center justify-center gap-2 w-full border border-gray-300 text-gray-600 rounded-lg py-2 bg-white/70 hover:bg-gray-50 transition">
            <Chrome className="w-5 h-5 text-red-500" />
            Continue with Google
          </button>
          <button className="flex items-center justify-center gap-2 w-full border border-gray-300 text-gray-600 rounded-lg py-2 bg-white/70 hover:bg-gray-50 transition">
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="text-gray-400 text-sm">or login with</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="border text-gray-700 border-gray-300 pl-10 pr-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="border text-gray-700 border-gray-300 pl-10 pr-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {loginMutation.isPending ? (
              "Logging in..."
            ) : (
              <>
                Login <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
