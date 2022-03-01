// Used to decode a base64 string and present in a page as an image source.
export const decode = (image) => `data:"images/png";charset=utf-8;base64,${image.toString('base64')}`;
