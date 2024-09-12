const resetPasswordTemplate = (email: string, resetToken: string) => {
  return {
    from: 'mailtrap@demomailtrap.com',
    to: email,
    subject: `Password reset link for your CORA'L account (valid for 10 minutes)`,
    text: `Use the following link to reset your password: http://127.0.0.1:4000/api/auth/reset-password/${resetToken}`
  }
};

export { resetPasswordTemplate };