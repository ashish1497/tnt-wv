import { useState } from 'react';

import Form from '../../components/Form';

type FormType = 'login' | 'register';

const Login = () => {
  const [formType, setFormType] = useState<FormType>('login');

  const handleChangeForm =
    (type: FormType) => (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setFormType(type);
    };

  return (
    <div className="p-1/5 box-border flex h-screen w-screen flex-row items-center justify-center bg-primary-200/80 -hue-rotate-15">
      <div className="flex h-4/5 w-4/5 flex-row items-center justify-evenly">
        <div className="flex flex-col items-center">
          <h1 className="font-serif font-semibold text-primary-300">
            start moving your things
          </h1>
          <h3 className="font-sans font-thin text-secondary-300">
            {formType === 'login' ? 'login now' : 'register today'}
          </h3>
          <div className="m-2 w-128">
            <Form key={formType} type={formType} />
          </div>
          <div className="flex w-full items-center justify-end px-2 text-primary-300">
            {formType === 'login' && (
              <div
                onClick={handleChangeForm('register')}
                className="cursor-pointer"
              >
                Register Instead?
              </div>
            )}
            {formType === 'register' && (
              <div
                onClick={handleChangeForm('login')}
                className="cursor-pointer"
              >
                Login Instead?
              </div>
            )}
          </div>
        </div>
        <div className="hidden h-fit md:flex">
          <img
            src="https://www.linkpicture.com/q/login_1.png"
            alt="truck clip art"
            title="tagntrac"
            width="196px"
            height="148px"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
