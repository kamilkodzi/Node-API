import { userService } from "../services/users";

export const authenticate = async ({ username, password }) => {
  const userNameToLowerCase = username.toLowerCase();
  const user = await userService.authenticateViaBasicAuth(
    userNameToLowerCase,
    password
  );
  if (user) {
    return user;
  }
};

export const userController = {
  authenticate,
};
