import LoginForm from './Login';
import RegisterForm from './Register';

type FormType = 'login' | 'register';

interface FormProps {
  type: FormType;
}

const FormHero = ({ type }: FormProps) => {
  if (type === 'login') {
    return <LoginForm />;
  }

  return <RegisterForm />;
};

export default FormHero;
