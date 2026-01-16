import { User, Mail, Calendar } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import { motion } from "motion/react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import formatIST from "../utils/formatIST";
import { Toaster, toast } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Profile = () => {
  const { user, logout, loading } = useAuthStore();
  const navigate = useNavigate();

  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
    return `${parts[0][0]} ${parts[1][0]}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-[15dvh]">
      <Header
        showInfinity={true}
        heading="Pages"
        name1="Home"
        fun1={() => navigate("/")}
        showUser={true}
      />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-semibold">
            {getInitials(user.name)}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p className="text-slate-500">{user.email}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-slate-50 rounded-lg p-4 text-center">
            <p className="text-xl font-semibold">{user.apps || 0}</p>
            <p className="text-sm text-slate-500">Apps Used</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 text-center">
            <p className="text-xl font-semibold">{user.notes || 0}</p>
            <p className="text-sm text-slate-500">Notes Created</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 text-center">
            <p className="text-xl font-semibold">
              {formatIST(user.createdAt).startsWith("I")
                ? formatIST(user.createdAt)
                : formatIST(user.createdAt).slice(0, 11)}
            </p>
            <p className="text-sm text-slate-500">Member Since</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 text-slate-700">
            <User size={18} />
            <span>{user.name}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <Mail size={18} />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <Calendar size={18} />
            <span>
              <strong>Joined: </strong> {formatIST(user.createdAt)}
            </span>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            onClick={() => toast.success("This feature will be added soon")}
          >
            Edit Profile
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 border rounded-lg text-white bg-red-500 hover:bg-red-700 cursor-pointer disabled:scale-100 disabled:bg-gray-400 disabled:cursor-not-allowed min-w-24"
            onClick={logout}
            disabled={loading}
          >
            {!loading ? (
              "Logout"
            ) : (
              <motion.div
                className="flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <AiOutlineLoading3Quarters className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </motion.button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Profile;
