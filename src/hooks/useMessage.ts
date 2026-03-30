import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../slice/messageSlice";
import type { AppDispatch } from "../store/store";

export default function useMessage() {
  const dispatch = useDispatch<AppDispatch>();

  const showSuccess = (message: string) => {
    dispatch(createAsyncMessage({ success: true, message }));
  };

  const showError = (message: string) => {
    dispatch(createAsyncMessage({ success: false, message }));
  };

  return { showSuccess, showError };
}
