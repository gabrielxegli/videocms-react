import React from "react";
import PropTypes from "prop-types";

const Home: React.FC = () => {
  return <div>Home</div>;
};

Home.propTypes = {};

type HomeLayoutProps = {
  children: React.ReactNode;
};

const HomeLayout: React.FC<HomeLayoutProps> = (props) => {
  return <div>{props.children}</div>;
};

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Home;
