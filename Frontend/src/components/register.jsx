import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

export const RegisterForm = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      })}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        try {
          // Make a POST request to register user
          const response = await axios.post("/user/register", {
            email: values.email,
            password: values.password,
          });

          // Handle success case
          console.log("User registered successfully:", response.data);
          // Redirect user to login page or show success message
        } catch (error) {
          // Handle error case
          console.error("Error registering user:", error.response.data);
          setFieldError("email", error.response.data.message); // Example: Display error message for email field
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {(formikProps) => (
        <Form className="auth-form">
          <label htmlFor="email">Email</label>
          <Field type="email" name="email" />
          <ErrorMessage
            name="email"
            component="div"
            className="error-message"
          />

          <label htmlFor="password">Password</label>
          <Field type="password" name="password" />
          <ErrorMessage
            name="password"
            component="div"
            className="error-message"
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <Field type="password" name="confirmPassword" />
          <ErrorMessage
            name="confirmPassword"
            component="div"
            className="error-message"
          />

          <div className="form-bottom">
            <div className="suggestion">
              <p>Already have an account?</p>
              <a href="#">Login</a>
            </div>
            <button
              className="reg-button"
              type="submit"
              disabled={formikProps.isSubmitting}
            >
              {formikProps.isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
