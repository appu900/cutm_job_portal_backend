import bcrypt from "bcryptjs";

export const makePasswordhash = (userPassword: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(userPassword, salt);
};

export const matchPassword = async (
  userInputPassword: string,
  hashedPassword: string
): Promise<Boolean> => {
  return bcrypt.compareSync(userInputPassword, hashedPassword);
};
