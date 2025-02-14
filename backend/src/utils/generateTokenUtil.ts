import jwt from "jsonwebtoken";
const generateToken = ({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email: string | null;
}) => {
  const SECRET_KEY = process.env.SECRET_KEY;

  if (!SECRET_KEY) {
    throw new Error("No secret key provided");
  }

  return jwt.sign({ id, name, email }, SECRET_KEY, { expiresIn: "1d" });
};

export default generateToken;
