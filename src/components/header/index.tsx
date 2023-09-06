import React from "react";
import { Link } from "react-router-dom";
import Image from "../image";

import image from "../../assets/videocms.png?w=100&quality=100&format=avif;webp;png&as=picture";

const Header: React.FC = () => {
  console.log(image);

  return (
    <div className="flex justify-between my-2 py-2">
      <Image image={image} alt="VideoCMS" width={50} height={50} />

      <nav>
        <Link to="/login">login</Link>
      </nav>
    </div>
  );
};

Header.propTypes = {};

export default Header;
