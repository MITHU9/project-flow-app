import { useMutation, useQuery } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  getMe,
  logoutUser,
  getAllUsers,
} from "../api/authApi";
import { queryClient } from "../utils/queryClient";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries(["me"]);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries(["me"]);
    },
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries(["me"]);
    },
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
    retry: false,
  });
};
