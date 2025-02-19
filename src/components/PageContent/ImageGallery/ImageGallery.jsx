import { Image } from "antd";

export const ImageGallery = ({ postImgURLs }) => {
  return (
    <>
      <Image.PreviewGroup
        preview={{
          onChange: (current, prev) =>
            console.log(`current index: ${current}, prev index: ${prev}`),
        }}
      >
        {Object.values(postImgURLs).map((url, i) => (
          <Image key={i} src={url} style={{ maxWidth: "100vw", width: 200 }} />
        ))}
      </Image.PreviewGroup>
    </>
  );
};
