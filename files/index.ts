const getImage = (filename: string) => {
  try {
    const image = require(`./${filename}`);
    return image.default.src;
  } catch (error) {
    return "";
  }
};

export default getImage;
