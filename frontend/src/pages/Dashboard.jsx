import { useLogout } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuthContext();
  const logout = useLogout();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout.mutate(null, {
      onSuccess: () => {
        toast.success("Logged out!");
        localStorage.removeItem("token");
        navigate("/login");
      },
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl">Welcome, {user?.name}</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
