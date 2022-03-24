// Used to decode a base64 string and present in a page as an image source.
export const decode = (image) => {
  if (image.includes('/images')) { // if image is a default image in "/images", do not encode.
    return image;
  }
  return `data:"images/png";charset=utf-8;base64,${image.toString('base64')}`;
};
