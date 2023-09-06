// module.d.ts
type IFormats = "avif" | "webp" | "png" | "jpg";

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

declare module "*&as=picture" {
  // eslint-disable-next-line
  const component: IPictureData;
  export default component;
}
