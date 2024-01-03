import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useAuth } from "../provider/AuthProvider";
import { AuthInput } from "../components/Input";
import { Button } from "../components/Button";

const initialValues = {
  token: "",
  url: "",
};

const loginSchema = Yup.object().shape({
  token: Yup.string().max(255, "Maximum 50 characters").required("Token is required"),
  url: Yup.string().required("URL is required"),
  // email: Yup.string().email("Wrong email format").max(255, "Maximum 50 characters").required("Email is required"),
  // password: Yup.string()
  //   .max(255, "Maximum 255 characters")
  //   .required("Password is required")
  //   .matches(
  //     // eslint-disable-next-line no-useless-escape
  //     /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{12,}$/,
  //     "Password must contain at least 12 characters, one uppercase, one lowercase, one number and one special case character"
  //   ),
  // tenant: Yup.string(),
});

const Login = () => {
  const { storeToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setFieldError }) => {
      setLoading(true);
      try {
        await storeToken({ ...values });
        setLoading(false);
      } catch (error) {
        if (error?.response?.status === 422 && error?.response?.data) {
          error.response.data?.forEach((err) => setFieldError(err.field, err.errorMsg));
        }
        // console.log(error);
        setLoading(false);
      }
    },
  });

  return (
    <div className="p-3">
      <h1 className="font-bold text-3xl">Welcome!</h1>
      <h2 className="text-sm">Add your token</h2>
      <form onSubmit={formik.handleSubmit} action="" method="POST" className="md:pt-10 pt-5">
        <div className="my-5">
          <AuthInput
            {...formik.getFieldProps("token")}
            type="text"
            placeholder="Token"
            error={formik.touched.token && formik.errors.token}
            errorMessage={formik.errors.token}
          />
        </div>
        <div className="my-5">
          <AuthInput
            {...formik.getFieldProps("url")}
            type="text"
            placeholder="URL"
            error={formik.touched.url && formik.errors.url}
            errorMessage={formik.errors.url}
          />
        </div>
        <div className="mt-8 mb-4 w-full">
          <Button loading={loading} disabled={formik.isSubmitting || !formik.isValid} type="submit" className="w-full">
            Proceed
          </Button>
        </div>
      </form>
    </div>
  );
};

export { Login };
