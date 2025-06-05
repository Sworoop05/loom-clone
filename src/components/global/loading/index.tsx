import React from "react";
import Spinner from "./spinner";
type Props = {
  children: React.ReactNode;
  state: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
};

const Loader = ({ children, state, size = "md", color = "blue" }: Props) => {
  return state ? <Spinner size={size} color={color} /> : children;
};

export default Loader;
