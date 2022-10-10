import { useState } from 'react';
import { UseMutationOptions } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { useRegister } from '../../hooks/useReactQuery';
import { Button, Input, Text } from '../../ui';

interface RegisterValues {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  type: 'user' | 'delivery';
}

const RegisterForm = () => {
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const options: UseMutationOptions = {
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
      } else {
        setSuccess(null);
        setErr(responseMessage);
        console.log(responseError);
      }
    },
    onError: (data: any) => {
      const { message: responseMessage } = data;
      setErr(responseMessage);
    },
  };

  const {
    mutate: register,
    isError,
    isLoading,
    error,
    // data,
  } = useRegister({ options });

  const RegisterSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required().min(6),
    type: yup.mixed().oneOf(['user', 'delivery']),
  });

  const _onSave = (values: RegisterValues) => {
    //todo: send to server here
    register(values);
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      type: 'user',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values: RegisterValues) => {
      // _onSave(values);
    },
  });

  return (
    <div className="">
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="firstName"
          variant="primary"
          label="First Name"
          type="text"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          errorMessage={
            formik.touched.firstName && Boolean(formik.errors.firstName)
              ? formik.touched.firstName && formik.errors.firstName
              : undefined
          }
        />
        <Input
          name="lastName"
          variant="primary"
          label="Last Name"
          type="text"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          errorMessage={
            formik.touched.lastName && Boolean(formik.errors.lastName)
              ? formik.touched.lastName && formik.errors.lastName
              : undefined
          }
        />
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
        {success ? <Text variant="success" text={success} /> : null}
      </form>
    </div>
  );
};

export default RegisterForm;
