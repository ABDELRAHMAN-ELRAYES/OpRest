export default {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  },
  cookies: {
    expiresIn: process.env.COOKIES_EXPIRES_IN,
  },
  webURL: process.env.WEB_URL,
  mail: {
    user: process.env.MAIL_GOOGLE_APP_USER,
    password: process.env.MAIL_GOOGLE_APP_PASSWORD,
    host: process.env.MAIL_GOOGLE_HOST,
    port: Number(process.env.MAIL_GOOGLE_PORT),
    service: process.env.MAIL_GOOGLE_APP_SERVICE,
    defaultFrom: process.env.MAIL_DEFAULT_FROM,
  },
  redis: {
    url: process.env.REDIS_URL,
  },
  otp: {
    expiresIn: Number(process.env.OTP_EXPIRES_IN),
  },
  oauth: {
    google: {
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
      secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_OAUTH_CALLBACK as string,
    },
    facebook: {
      appId: process.env.FACEBOOK_APP_OAUTH_ID as string,
      appSecret: process.env.FACEBOOK_APP_OAUTH_SECRET as string,
      callbackURL: process.env.FACEBOOK_APP_OAUTH_CALLBACK as string,
    },
  },
};
