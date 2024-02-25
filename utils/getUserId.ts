import jwt from "jsonwebtoken";

function getUserIdFromToken(token: string) {
  try {
    const decoded = jwt.decode(token);
    if (decoded && typeof decoded !== "string") {
      return decoded.id;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}
export { getUserIdFromToken };
