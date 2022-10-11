import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { Button, Input, Text } from '../../ui';
import { useLogin } from '../../hooks/useReactQuery';
import { useAuthContext } from 'contexts/AuthContext';

interface LoginValues {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  const { loginHandler } = useAuthContext();

  const options = {
    onSuccess: (data: any) => {
      const {
        success: responseSuccess,
        message: responseMessage,
        data: responseData,
        error: responseError,
      } = data;
      if (responseSuccess) {
        setErr(null);
        setSuccess(responseMessage);
        loginHandler(responseData, '/');
      } else {
        setSuccess(null);
        setErr(responseMessage);
        console.log(responseError);
      }
    },
  };

  const {
    mutate: login,
    isError,
    isLoading,
    error,
    // data,
  } = useLogin({ options });

  const LoginSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required().min(6),
  });

  const _onSave = (values: LoginValues) => {
    //todo: send to server here
    login(values);
  };

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: (values: LoginValues) => {
      _onSave(values);
    },
  });

  return (
    <div className="">
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="username"
          variant="primary"
          label="Username"
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
          errorMessage={
            formik.touched.username && Boolean(formik.errors.username)
              ? formik.touched.username && formik.errors.username
              : undefined
          }
        />
        <Input
          name="password"
          variant="primary"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          errorMessage={
            formik.touched.password && Boolean(formik.errors.password)
              ? formik.touched.password && formik.errors.password
              : undefined
          }
        />
        <Button title="Submit" type="submit" variant="main" />
        {isLoading ? <Text variant="warning" text="Loading..." /> : null}
        {isError ? <Text variant="failure" text={'Server err'} /> : null}
        {err ? <Text variant="failure" text={err} /> : null}
        {error ? <Text variant="failure" text={JSON.stringify(error)} /> : null}
        {success ? <Text variant="success" text={success} /> : null}
      </form>
    </div>
  );
};

export default LoginForm;
