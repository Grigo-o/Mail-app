import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const ComposeForm = () => {
  return (
    <Formik
      initialValues={{
        recipient: "",
        subject: "",
        body: "",
      }}
      validationSchema={Yup.object().shape({
        recipient: Yup.string()
          .email("Invalid email address")
          .required("Recipient is required"),
        subject: Yup.string()
          .min(3, "Subject must be at least 3 characters")
          .required("Subject is required"),
        body: Yup.string()
          .min(3, "Body must be at least 3 characters")
          .required("Body is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // Handle form submission
        console.log(values);
        setSubmitting(false);
      }}
    >
      <Form className="auth-form">
        <label htmlFor="recipient">Recipient</label>
        <Field type="email" name="recipient" />
        <ErrorMessage
          name="recipient"
          component="div"
          className="error-message"
        />

        <label htmlFor="subject">Subject</label>
        <Field type="text" name="subject" />
        <ErrorMessage
          name="subject"
          component="div"
          className="error-message"
        />

        <label htmlFor="body">Body</label>
        <Field as="textarea" name="body" />
        <ErrorMessage name="body" component="div" className="error-message" />

        <div className="form-bottom-compose">
          <button className="send-button" type="submit">
            Send
          </button>
        </div>
      </Form>
    </Formik>
  );
};
