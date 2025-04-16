export const getTokenInClient = () => {
  return document?.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];
};
