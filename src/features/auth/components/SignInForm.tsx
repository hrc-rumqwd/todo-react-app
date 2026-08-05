import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { LoginContract } from '../types/authentication';
import { useAuth } from '../hooks/useAuth';
import { useLogin } from '../hooks/useLogin';
import { useState } from 'react';
import { SignUpPath } from '../types/constants';

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginContract>();

  const [onSubmitLoading, setOnSubmitLoading] = useState(false);
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const authState = useAuth();

  if (authState.isAuthenticated) return <Navigate to={'/'} replace />;

  const onSubmit: SubmitHandler<LoginContract> = (data) => {
    setOnSubmitLoading(true);
    loginMutation.mutate(data, {
      onSuccess: () => navigate('/'),
    });
    setOnSubmitLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
      <form
        style={{ width: '30rem' }}
        className="text-dark px-5 py-3 bg-app-primary-white rounded-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
          Log in
        </h3>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            {...register('email')}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            {...register('password')}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            {...register('rememberMe')}
          />
          <label className="form-check-label">Remember Me?</label>
        </div>

        <div className="pt-1 mb-4">
          <button
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-primary btn-lg btn-block"
            type="submit"
            disabled={onSubmitLoading}
          >
            Login
          </button>
        </div>

        <p className="small mb-5 pb-lg-2">
          <a className="text-muted" href="#!">
            Forgot password?
          </a>
        </p>
        <p>
          Don't have an account? <Link to={SignUpPath}>Register</Link>
        </p>
      </form>
    </div>
  );
}
