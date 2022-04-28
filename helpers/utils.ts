export const preventDuplicateIdGenerator = (
  creationTimeInMiliseconds: number,
  sendFromSystem: string,
  sendFromSource: string,
  sendFromCustomer: string,
  sendFromUser: string,
  isShowingAnError: number,
  uniqueCodeORDescription: string
) => {
  let isShowingAnErrorMySqlParsed: number;
  if (isShowingAnError) {
    isShowingAnErrorMySqlParsed = 1;
  } else {
    isShowingAnErrorMySqlParsed = 0;
  }
  return (
    creationTimeInMiliseconds.toString() +
    "." +
    sendFromSystem +
    "." +
    sendFromSource +
    "." +
    sendFromCustomer +
    "." +
    sendFromUser +
    "." +
    isShowingAnErrorMySqlParsed.toString() +
    "." +
    uniqueCodeORDescription
  );
};
