"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
interface props {
  children: ReactNode;
}
export const ReduxProvider = ({ children }: props) => {
  return <Provider store={store}>{children}</Provider>;
};
