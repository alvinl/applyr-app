/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { AuthContext } from '../../state/auth/AuthContext';
import BaseLayout from '../../layouts/BaseLayout';
import Field from '../../components/Field/Field';
import { useForm } from 'react-hook-form';
import registerUser from '../../api/user/register';
import isUsernameTaken from '../../api/user/isUsernameTaken';

const RegisterView = () => {
  const { register, handleSubmit, setError, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { authDispatch } = useContext(AuthContext);
  const history = useHistory();

  const onSignUpFormSubmit = async ({ username, password }) => {
    setIsLoading(true);

    const { data, error } = await isUsernameTaken(username);

    if (data.usernameExists) {
      setIsLoading(false);
      setError("username", {
        type: "manual",
        message: "Username is taken!"
      });
    } else {
      const { data, error } = await registerUser(username, password);

      
      authDispatch({
        type: 'LOGIN',
        username,
        token: data.token,
      });

      setIsLoading(false);
      history.push('/');
    }
  };

  return (
    <BaseLayout>
      <div className="flex justify-center">
        <div className="mt-16 text-center">
          <h1 className="text-4xl font-semibold">Sign up</h1>
          <form
            css={css`* { margin: 15px 0; }`}
            onSubmit={handleSubmit(onSignUpFormSubmit)}
          >
            <Field register={register({ required: "Missing username" })}
              name="username" error={errors.username}
              type="text" placeholder="Username" maxLength="30" />
            <Field
              register={register({
                required: "Missing password",
                minLength: { value: 8, message: "Password is too short" }
              })}
              name="password" error={errors.password}
              type="password" placeholder="Password" minLength="8" maxLength="30" />
            <input
              css={css`background-color: #E24F54;`}
              className="w-full rounded-full py-2.5 text-white"
              type="submit" value="Sign up" />
          </form>
          {isLoading && (
            <div className="flex justify-center items-center">
              <Loader visible={isLoading} type="TailSpin" color="#00BFFF" height={50} width={50} />
              <div className="mx-3">Signing up...</div>
            </div>
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default RegisterView;