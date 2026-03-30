import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  id: string;
  type: "success" | "danger";
  title: string;
  text: string;
}

interface MessagePayload {
  id: string;
  success: boolean;
  message: string;
}

const messageSlice = createSlice({
  name: "message",
  initialState: [] as Message[],
  reducers: {
    createMessage(state, action: PayloadAction<MessagePayload>) {
      state.push({
        id: action.payload.id,
        type: action.payload.success ? "success" : "danger",
        title: action.payload.success ? "成功" : "失敗",
        text: action.payload.message,
      });
    },
    removeMessage(state, action: PayloadAction<string>) {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const createAsyncMessage = createAsyncThunk(
  "message/createAsyncMessage",
  async (
    payload: { success: boolean; message: string },
    { dispatch, requestId },
  ) => {
    dispatch(
      messageSlice.actions.createMessage({
        ...payload,
        id: requestId,
      }),
    );

    setTimeout(() => {
      dispatch(messageSlice.actions.removeMessage(requestId));
    }, 2000);
  },
);

export const { createMessage, removeMessage } = messageSlice.actions;
export default messageSlice.reducer;
