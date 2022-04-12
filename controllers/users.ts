import userService from "../services/users";
let counterLogin = 0;
const authenticate = async ({ username, password }) => {
  counterLogin++;
  console.log("odpalono serwis autentykacyjny " + counterLogin + " razy");
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
