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
          <Image key={i} src={url} className="blog-post__gallery-item" />
        ))}
      </Image.PreviewGroup>
    </>
  );
};
