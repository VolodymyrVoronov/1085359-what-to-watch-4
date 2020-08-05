export const createAuthorizationInfo = (user) => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatarUrl: `https://4.react.pages.academy${user.avatar_url}`,
  };
};
