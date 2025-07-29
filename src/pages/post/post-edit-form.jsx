import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { server } from "../../bff";
import { editPost, setPost } from "../../redux/actions";
import { DeletePostButton } from "../../components/DeletePostButton/DeletePostButton";
import { Button, Input, Form } from "antd";
import {
  SaveOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";
import "./post-edit-form.scss";

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};

export const PostEditForm = ({
  post: { id, title, content, image_urls },
  isEditing,
}) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClickSave = () => {
    const { title, content, urls } = form.getFieldsValue();
    const dbURLs = Object.assign({}, urls);

    if (isEditing) {
      server
        .editPost(id, title, content, dbURLs)
        .then(({ res }) => {
          dispatch(editPost(res));
        })
        .then(() => {
          navigate(`/post/${id}`);
        });
    } else {
      server.editPost(id, title, content, dbURLs).then(({ res }) => {
        dispatch(setPost(res));
        navigate(`/post/${res.id}`);
      });
    }
  };

  useLayoutEffect(() => {
    form.resetFields();

    form.setFieldsValue({
      title: title || "",
      content: content || "",
      urls: Object.values(image_urls) || [""],
    });
  }, [image_urls, form]);

  return (
    <article className="post-edit-form__content">
      <h2 className="blog-post__title">
        {isEditing ? "Edit post" : "Add new post"}
      </h2>
      <Form
        form={form}
        name="wrap"
        onFinish={handleClickSave}
        labelCol={{
          flex: "110px",
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1,
        }}
        colon={false}
      >
        <section className="post-edit-form__title-edit">
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Enter post title..." />
          </Form.Item>
        </section>

        <section className="post-edit-form__gallery-edit">
          <Form.List
            name="urls"
            rules={[
              {
                validator: async (_, urls) => {
                  if (!urls || urls.length < 1) {
                    return Promise.reject(new Error("At least 1 image"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...formItemLayout}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            "Please input image URL or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input placeholder={`Image #${index + 1} URL`} />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <Button
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                        icon={<MinusCircleOutlined />}
                      ></Button>
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{
                      width: "100%",
                    }}
                    icon={<PlusOutlined />}
                  >
                    Add image
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </section>

        <section className="post-edit-form__content-edit">
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea
              placeholder="Enter post content..."
              autoSize={{
                minRows: 6,
              }}
            />
          </Form.Item>
        </section>

        <section className="post-edit-form__control-panel">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={isEditing ? <SaveOutlined /> : <SendOutlined />}
            >
              {isEditing ? "Save" : "Publish"}
            </Button>
          </Form.Item>

          {isEditing && (
            <Form.Item>
              <DeletePostButton postId={id} />
            </Form.Item>
          )}
        </section>
      </Form>
    </article>
  );
};
