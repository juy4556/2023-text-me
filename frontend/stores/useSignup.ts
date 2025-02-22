import { AxiosError } from "axios";
import create from "zustand";
import visitorApi from "../auth/visitorApi";
import { FieldValues } from "react-hook-form";
import { PATH } from "../constants/api";

interface Signup {
  loading: boolean;
  error: AxiosError | null;
  trySignup: (data: FieldValues, callback: Function) => void;
}

const useSignup = create<Signup>((set) => ({
  loading: false,
  error: null,
  trySignup: async (data, callback) => {
    await visitorApi
      .post(PATH.USER.SIGNUP, data)
      .then((res) => {
        callback();
      })
      .catch((error) => {
        if (error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("에러가 발생했습니다.");
        }
      });
  },
}));

export { useSignup };
