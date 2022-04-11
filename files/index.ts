const getImage = (filename: string) => {
  try {
    const image = require(`./${filename}`);
    return image.default.src;
  } catch (error) {
    console.log(filename);
    return "";
  }
};

export default getImage;
