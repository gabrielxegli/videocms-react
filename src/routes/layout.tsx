import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useMediaPredicate } from "react-media-hook";
import { useTheme } from "../store/theme";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const { theme, change } = useTheme();
  const preferredTheme = useMediaPredicate("(prefers-color-scheme: dark)");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", preferredTheme);

    console.log(theme);

    change(preferredTheme ? "dark" : "light");
  }, [theme, change, preferredTheme]);

  return (
    <div className="min-h-screen p-2">
      {props.children} {theme}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
