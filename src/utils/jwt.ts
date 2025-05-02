import jwt from "jsonwebtoken";

export const generateJWT = (email: string, id:number, role: string) => {
  const token = jwt.sign(
    {
      email,
      id,
      role,
    },
    "hello_world_brother_haha",
    { expiresIn: "10d" }
  );
  return token;
};
