export const createVerificationEmail = (email: string, url: string) => {
  return {
    from: "ProgressPal <progresspal.app@gmail.com>", // sender address
    to: email, // list of receivers
    subject: "Confirmation Email ✔", // Subject line
    text: `Please confirm your account by clicking this link: ${url}`, // plain text body
    html: `<a href="${url}">${url}</a>`, // html body
  };
};

export const createResetPasswordEmail = (email: string, url: string) => {
  return {
    from: "ProgressPal <progresspal.app@gmail.com>", // sender address
    to: email, // list of receivers
    subject: "Password Reset", // Subject line
    text: `Click this link to reset your password ${url}`, // plain text body
    html: `<a href="${url}">${url}</a>`, // html body
  };
};
