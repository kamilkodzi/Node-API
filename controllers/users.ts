// import userService from "../services/users";
// import apiResponseCreator from "../helpers/apiResponseGenerator";
// import consts from "../config/consts";
// import ExpressError from "../helpers/ExpressError";
// let counterLogin = 0;

// const authenticate = async ({ username, password }) => {
//   counterLogin++;
//   console.log("Sprawdzano login i hasło ", counterLogin, " razy");
//   const userNameToLowerCase = username.toLowerCase();
//   const user = await userService.authenticateViaBasicAuth(
//     userNameToLowerCase,
//     password
//   );
//   if (user) {
//     return user;
//   }
// };

// const isLogedIn = (req, res) => {
//   const isUserAuthenticated = req.session.authenticated;
//   const currentUser = req.session.user?.username;
//   const apiAnswer = apiResponseCreator.authenticationResponse(
//     isUserAuthenticated,
//     currentUser
//   );
//   res.status(200).send(apiAnswer);
// };

// const logIn = async (req, res, next) => {
//   let apiAnswer;
//   const isUserAuthenticated = req.session.authenticated;
//   const currentUser = req.session.user?.username;
//   const username = req.body[consts.httpBodyAndQueries.username];
//   const password = req.body[consts.httpBodyAndQueries.password];
//   let userInDb;

//   if (isUserAuthenticated) {
//     apiAnswer = apiResponseCreator.authenticationResponse(
//       isUserAuthenticated,
//       currentUser
//     );
//     res.status(200).send(apiAnswer);
//   }
//   if (!isUserAuthenticated) {
//     userInDb = await authenticate({ username, password });
//   }

//   if (userInDb && !isUserAuthenticated) {
//     req.session.user = userInDb;
//     req.session.authenticated = true;
//     apiAnswer = apiResponseCreator.authenticationResponse(
//       true,
//       userInDb.username
//     );
//     res.status(200).send(apiAnswer);
//   }
//   if (!userInDb && !isUserAuthenticated) {
//     next(new ExpressError("Invalid Authentication Credentials", 401));
//   }
// };

// export = {
//   authenticate,
//   isLogedIn,
//   logIn,
// };
