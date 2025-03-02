import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { server, sessions } from "../../bff";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/actions/set-user";
import { useDispatch } from "react-redux";
import { ValidationError } from "../../components";
import "./authorization.scss";

const authFormScheme = yup.object().shape({
  login: yup.string().required("Shouldn't be empty"),
  password: yup
    .string()
    .required("Shouldn't be empty")
    .matches(/^[\w]*$/, "Password must contain only letters and numbers.")
    .min(3, "Password must not be shorter than 3 characters")
    .max(20, "Password should not be longer than 20 characters"),
});

export const Authorization = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm({
    resolver: yupResolver(authFormScheme),
    mode: "onTouched",
  });

  const [serverError, setServerError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmit = ({ login, password }) => {
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
      reset();
      navigate("/");
    });
  };

  return (
    <article className="userForm__wrapper">
      <form className="userForm" onSubmit={handleSubmit(onFormSubmit)}>
        <h3 className="formTitle">Authorization</h3>
        <div className="inputWrapper">
          <input
            {...register("login", { onChange: () => setServerError("") })}
            type="text"
            name="login"
            placeholder="Login"
            className={`formInput ${errors.login && "hasError"}`}
          ></input>
          <span className="errorText">{errors.login?.message}</span>
        </div>
        <div className="inputWrapper">
          <input
            {...register("password", { onChange: () => setServerError("") })}
            type="password"
            name="password"
            placeholder="Password"
            className={`formInput ${errors.password && "hasError"}`}
          ></input>
          <span className="errorText">{errors.password?.message}</span>
        </div>
        <button
          type="submit"
          className="submitBtn"
          data-focus="0"
          disabled={!isValid}
        >
          Log in
        </button>
        {serverError && <ValidationError errorText={serverError} />}
        <div className="tip">
          Does not have an account? <Link to="/register">Registartion</Link>
        </div>
      </form>
    </article>
  );
};
