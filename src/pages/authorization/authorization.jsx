import * as yup from "yup";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/set-user";
import { server, sessions } from "../../bff";
import { ValidationError } from "../../components";
import { Form, Input, Button } from "antd";
import "./authorization.scss";

export const Authorization = () => {
  const [form] = Form.useForm();

  const [submittable, setSubmittable] = useState(false);
  const [serverError, setServerError] = useState("");

  const formRules = {
    login: [{ required: true, message: "Shouldn't be empty" }],
    password: [
      { required: true, message: "Shouldn't be empty" },
      {
        pattern: /^[\w]*$/,
        message: "Password must contain only letters and numbers",
      },
      { min: 3, message: "Password should't be shorter than 3 characters" },
      { max: 20, message: "Password should't be longer than 20 characters" },
    ],
  };

  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmit = () => {
    const { login, password } = form.getFieldsValue();

    server.authorize(login, password).then(({ res, error }) => {
      if (error) {
        setServerError(error);
        return;
      }

      dispatch(setUser(res));
      sessionStorage.setItem(
        "userData",
        JSON.stringify({ ...sessions.list[res.session], session: res.session }),
      );
      form.resetFields();
      navigate("/");
    });
  };

  return (
    <article className="userForm__wrapper">
      <Form
        form={form}
        name="userForm"
        className="userForm"
        validateTrigger="onBlur"
      >
        <h3 className="formTitle">Authorization</h3>
        <Form.Item name="login" rules={formRules.login}>
          <Input placeholder="Login"></Input>
        </Form.Item>
        <Form.Item name="password" rules={formRules.password}>
          <Input.Password placeholder="Password"></Input.Password>
        </Form.Item>
        <Button
          onClick={onFormSubmit}
          type="submit"
          className="submitBtn"
          data-focus="0"
          form={form}
          disabled={!submittable}
        >
          Log in
        </Button>
        {serverError && <ValidationError errorText={serverError} />}
        <div className="tip">
          Does not have an account? <Link to="/register">Registartion</Link>
        </div>
      </Form>
    </article>
  );
};
