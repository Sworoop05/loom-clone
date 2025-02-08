import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
const Provider = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <div>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </div>
  );
};

export default Provider;
