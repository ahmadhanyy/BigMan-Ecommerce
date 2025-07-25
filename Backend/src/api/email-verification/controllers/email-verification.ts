module.exports = {
  async sendVerificationCode(ctx) {
    const { email } = ctx.request.body;

    if (!email) {
      return ctx.badRequest('Email is required');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code

    // Store in DB or cache (simplified using Strapi's config or plugin store)
    await strapi.plugin('users-permissions').store.set({ key: `verify_${email}`, value: code });

    // Send email
    await strapi.plugins['email'].services.email.send({
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is ${code}`,
    });

    ctx.send({ message: 'Verification code sent' });
  },

  async verifyCode(ctx) {
    const { email, code } = ctx.request.body;

    if (!email || !code) {
      return ctx.badRequest('Email and code are required');
    }

    const storedCode = await strapi.plugin('users-permissions').store.get({ key: `verify_${email}` });

    if (storedCode === code) {
      await strapi.plugin('users-permissions').store.delete({ key: `verify_${email}` });
      ctx.send({ success: true });
    } else {
      ctx.send({ success: false, message: 'Invalid verification code' });
    }
  }
};
