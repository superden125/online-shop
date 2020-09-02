import React, { useEffect, useState } from "react";
import { Formik, Field, Form, FastField } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../custom-field/InputField";
import { register } from "../../action/userAction";
import { showNotify } from "../component/Notify";

function SigninPage(props) {
  const [showErr, setShowErr] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, error } = userRegister;
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (userInfo && userInfo.token) {
      setShowErr("");
      props.history.push(redirect);
      showNotify("Signup Success", " ", "success");
    }
    if (error) {
      showNotify("Error", error.error, "danger");
      setShowErr(error.error);
    }
    return () => {};
  }, [userInfo, error]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4 col-12 form-container">
          <h3 className="text-center">Signup</h3>
          {showErr && <span className="text-danger">{showErr}</span>}
          <Formik
            initialValues={{
              username: "",
              name: "",
              email: "",
              password: "",
              rePassword: "",
            }}
            validationSchema={
              Yup.object().shape({
                username: Yup.string().required("Required"),
                name: Yup.string().required("Required"),
                email: Yup.string().required("Required").email("Must a email"),
                password: Yup.string().required("Required"),
                rePassword: Yup.string()
                  .required("Required")
                  .oneOf(
                    [Yup.ref("password"), null],
                    "Confirm password not match"
                  ),
              })
              // .test("match", "Password do not match", function (values) {
              //   return values.password === values.rePassword;
              // })
            }
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              //console.log(values);
              dispatch(register(values));

              resetForm();
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => {
              return (
                <Form>
                  <FastField
                    type="text"
                    name="name"
                    label="Name"
                    component={InputField}
                  />
                  <FastField
                    type="text"
                    name="username"
                    label="Username"
                    component={InputField}
                  />
                  <FastField
                    type="email"
                    label="Email"
                    name="email"
                    component={InputField}
                  />
                  <FastField
                    type="password"
                    label="Password"
                    name="password"
                    component={InputField}
                  />
                  <FastField
                    type="password"
                    label="Confirm Password"
                    name="rePassword"
                    component={InputField}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                  >
                    Sign In
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

export default SigninPage;
