import axios, { AxiosError } from "axios";
import create from "zustand";
import visitorApi from "../auth/visitorApi";

interface RoomEnter {
  isLoading: boolean;
  error: AxiosError | null;
  enter: (data: string, callback: (id: string) => void) => void;
}

const useRoomEnter = create<RoomEnter>((set) => ({
  isLoading: false,
  error: null,
  enter: async (data, callback) => {
    set({ isLoading: true, error: null });
    await visitorApi
      .get("/users/find", {
        params: {
          email: data,
        },
      })
      .then((res) => {
        callback(res.data.id);
      })
      .catch((error) => {
        set({ error });
        alert(error.response.data.message);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));

export { useRoomEnter };
