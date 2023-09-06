import React from "react";
import PropTypes from "prop-types";

type HomeLayoutProps = {
  children: React.ReactNode;
};

const HomeLayout: React.FC<HomeLayoutProps> = (props) => {
  return <div>{props.children}</div>;
};

HomeLayout.propTypes = {
  children: PropTypes.node,
};

export default HomeLayout;
