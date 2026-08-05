import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import type { SignUpContract } from '../types/authentication';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { SignInPath } from '../types/constants';
import { useSignUp } from '../hooks/useSignUp';

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpContract>();

  const [onSubmitLoading, setOnSubmitLoading] = useState(false);
  const signUpMutation = useSignUp();
  const navigate = useNavigate();
  const authState = useAuth();

  if (authState.isAuthenticated) return <Navigate to={'/'} replace />;

  const onSubmit: SubmitHandler<SignUpContract> = (data) => {
    setOnSubmitLoading(true);
    signUpMutation.mutate(data, {
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
          Sign up
        </h3>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            {...register('fullName')}
          />
        </div>
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
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            {...register('confirmPassword')}
          />
        </div>

        <div className="pt-1 mb-4">
          <button
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-primary btn-lg btn-block"
            type="submit"
            disabled={onSubmitLoading}
          >
            Register
          </button>
        </div>
        <p>
          Have an account? <Link to={SignInPath}>Login</Link>
        </p>
      </form>
    </div>
  );
}
