module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/send-verification-code',
      handler: 'email-verification.sendVerificationCode',
      config: {
        policies: [],
        auth: false
      },
    },
    {
      method: 'POST',
      path: '/verify-code',
      handler: 'email-verification.verifyCode',
      config: {
        policies: [],
        auth: false
      },
    },
  ],
};
