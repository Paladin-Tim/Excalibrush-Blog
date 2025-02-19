import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../hooks";
import { server } from "../../bff";
import { editPost } from "../../redux/actions";
import { DeletePostButton } from "../../components/DeletePostButton/DeletePostButton";
import { Button, Input } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export const PostEditForm = ({ post: { id, title, content, image_urls } }) => {
  const titleInput = useInput(title);
  const contentInput = useInput(content);
  const [urlInputsValues, setUrlInputsValues] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClickSave = () => {
    const urls = Object.assign({}, urlInputsValues);

    server
      .editPost(id, titleInput.value, contentInput.value, urls)
      .then(({ res }) => {
        dispatch(editPost(res));
      })
      .then(() => {
        navigate(`/post/${id}`);
      });
  };

  const handleChangeURL = (newValue, index) => {
    const updatedURLs = urlInputsValues.map((value, i) => {
      return i === index ? newValue : value;
    });
    setUrlInputsValues(updatedURLs);
  };

  useLayoutEffect(() => {
    setUrlInputsValues(Object.values(image_urls));
  }, [image_urls]);

  return (
    <article className="post-edit-form__content">
      <h2 className="blog-post__title">Edit post</h2>
      <section className="post-edit-form__control-panel">
        <Button icon={<SaveOutlined />} onClick={handleClickSave}></Button>
        <DeletePostButton postId={id} />
      </section>
      <Input {...titleInput} placeholder="Enter post title..." />
      <section className="post-edit-form__gallery">
        {Object.values(image_urls).map((url, i) => (
          <Input
            key={i}
            defaultValue={url}
            placeholder={`Image #${i + 1} URL`}
            onChange={({ target }) => handleChangeURL(target.value, i)}
          />
        ))}
      </section>
      <TextArea
        {...contentInput}
        placeholder="Enter post content..."
        autoSize={{
          minRows: 6,
        }}
      />
    </article>
  );
};
