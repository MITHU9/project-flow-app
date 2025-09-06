import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation/authSchema";
import { useRegister } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Github, Mail, Lock, User, ArrowRight, Chrome } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await registerMutation.mutateAsync(data);
      toast.success("Registered successfully!");
      navigate("/project");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 
                    bg-gradient-to-br from-green-50 via-white to-green-100"
    >
      {/* Animated background blobs */}
      <div className="absolute top-[-100px] left-[-120px] w-[400px] h-[400px] bg-green-300/40 clip-path-blob blur-3xl animate-float" />
      <div
        className="absolute bottom-[-120px] right-[-150px] w-[500px] h-[500px] bg-green-500/30 clip-path-blob blur-2xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-[200px] right-[50px] w-[300px] h-[300px] bg-green-200/30 clip-path-blob blur-2xl animate-float"
        style={{ animationDelay: "4s" }}
      />

      {/* Register Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl p-8 relative z-10 border border-gray-200 clip-path-card">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Create your ProjectFlow account
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Get started today. It's quick and easy.
        </p>

        {/* OAuth Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button className="flex text-gray-700 items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-2 bg-white/70 hover:bg-gray-50 transition">
            <Chrome className="w-5 h-5 text-red-500" />
            Continue with Google
          </button>
          <button className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-2 bg-white/70 text-gray-700 hover:bg-gray-50 transition">
            <Github className="w-5 h-5 text-gray-600" />
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="text-gray-400 text-sm">or register with</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className="border text-gray-700 border-gray-300 pl-10 pr-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="border text-gray-600 border-gray-300 pl-10 pr-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
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
              className="border text-gray-700 border-gray-300 pl-10 pr-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {registerMutation.isPending ? (
              "Registering..."
            ) : (
              <>
                Register <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
