import RestClient from '../RestClient';

const Login = payload => {
  return RestClient.Post('auth/login', payload);
};

const Register = payload => {
  return RestClient.Post('auth/register', payload);
};

const VerifyEmailCode = payload => {
  return RestClient.Post('auth/verify-email-code', payload);
};

const ResendEmailCode = payload => {
  return RestClient.Post('auth/resend-email-code', payload);
};

const SendForgotPasswordCode = payload => {
  return RestClient.Post('auth/send-forgot-password-code', payload);
};

const ForgotPassword = payload => {
  return RestClient.Post('auth/forgot-password', payload);
};

const VerifyForgotPasswordCode = payload => {
  return RestClient.Post('auth/verify-forgot-password-code', payload);
};

export default { Login, Register, VerifyEmailCode, ResendEmailCode, SendForgotPasswordCode, ForgotPassword, VerifyForgotPasswordCode };