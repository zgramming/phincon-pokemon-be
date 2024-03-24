export const config = {
  PORT: process.env.PORT || 4000,
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  SECRET_KEY: process.env.JWT_SECRECT_KEY || 'secret',
};
