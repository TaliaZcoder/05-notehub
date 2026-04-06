import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string().required(),
});

<Formik
  initialValues={{ title: "", content: "", tag: "Todo" }}
  validationSchema={schema}
  onSubmit={(values) => onSubmit(values)}
></Formik>