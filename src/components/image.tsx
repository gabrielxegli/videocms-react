import React from "react";

interface IPictureData {
  sources: {
    [key in IFormats]: { src: string; w: number }[];
  };

  img: {
    w: number;
    h: number;
    src: string;
  };
}

type IFormats = "avif" | "webp" | "png" | "jpg";

type ImageProps = {
  image: IPictureData;
  alt: string;

  width?: number;
  height?: number;
};

const Source = (
  source: [string, { src: string; w: number }[]],
  index: number
) => {
  const [format, images] = source;

  return (
    <source
      key={index}
      srcSet={images.map((i) => i.src + " " + i.w + "w").join(", ")}
      type={"image/" + format}
    />
  );
};

// million-ignore
const Image: React.FC<ImageProps> = ({ image, alt, width, height }) => {
  const { sources, img } = image;

  return (
    <picture>
      {Object.entries(sources).map(Source)}

      <img
        src={img.src}
        alt={alt}
        loading="eager"
        decoding="async"
        width={width}
        height={height}
      />
    </picture>
  );
};

Image.propTypes = {};

export default Image;
