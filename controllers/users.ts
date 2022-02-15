import userService  from "../services/users";

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

const usersController = {
  authenticate,
};
export default usersController;
