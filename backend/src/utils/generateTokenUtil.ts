import jwt from "jsonwebtoken";

const generateToken = ({ id }: { id: any }) => {
  const SECRET_KEY = process.env.SECRET_KEY;

  if (!SECRET_KEY) {
    throw new Error("No secret key provided");
  }

  return jwt.sign({ id }, SECRET_KEY, { expiresIn: "1d" });
};

export default generateToken;
