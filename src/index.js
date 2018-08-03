import React from "react";
import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup"; // for everything

const App = ({ values, errors, touched, isSubmitting }) => {
  console.log('errors', errors);
  console.log('touched', touched);
  return (<Form>
    <div>
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field type="email" name="email" placeholder="Email" />
    </div>
    <div>
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field type="password" name="password" placeholder="Pasword" />
    </div>
    <label>
      <Field type="checkbox" name="newsLetter" checked={values.newsLetter} />
      Join our newsLetter
    </label>
    <Field component="select" name="plan">
      <option value="free">Free</option>
      <option value="premium">Premium</option>
    </Field>
    <button disabled={isSubmitting}>Submit</button>
  </Form>
);
}

const FormikApp = withFormik({
  mapPropsToValues({ email, password, newsLetter, plan }) {
    return {
      email: email || "",
      password: password || "",
      newsLetter: newsLetter || false,
      plan: plan || "free"
    };
  },

  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required!"),
    password: yup
      .string()
      .min(5, "Password must be 5 characters or longer")
      .required("Password is required!")
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if (values.email === "jure@gmail.com") {
        setErrors({ email: "that email is already taken" });
      } else {
        resetForm();
      }
      setSubmitting(false);
    }, 2000);
  }
})(App);

const rootElement = document.getElementById("root");
ReactDOM.render(<FormikApp />, rootElement);
