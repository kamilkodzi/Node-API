import userService from "../services/users";
let counterLogin = 0;
const authenticate = async ({ username, password }) => {
  const userNameToLowerCase = username.toLowerCase();
  const user = await userService.authenticateViaBasicAuth(
    userNameToLowerCase,
    password
  );
  if (user) {
    return user;
  }
};

export = {
  authenticate,
};
