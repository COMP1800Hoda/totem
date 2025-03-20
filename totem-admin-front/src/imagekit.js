import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY, 
    urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT, 
    privateKey: import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY,
  });

export default imagekit;