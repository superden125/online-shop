import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../action/userAction";
import { showNotify } from "../component/Notify";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import InputField from "../../custom-field/InputField";

function LoginPage(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    if (error) {
      showNotify("Error", "Login Fail!", "danger");
    }
    return () => {};
  }, [userInfo, error]);

  const submitHandler = (values) => {
    dispatch(login(values.username, values.password));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4 col-12 form-container">
          <h3 className="text-center">Login</h3>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required("Required"),
              password: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              submitHandler(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => {
              return (
                <Form>
                  <FastField
                    type="text"
                    name="username"
                    label="Username"
                    component={InputField}
                  />
                  <FastField
                    type="password"
                    name="password"
                    label="Password"
                    component={InputField}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                  <button type="reset" className="btn btn-warning btn-block">
                    Cancel
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
