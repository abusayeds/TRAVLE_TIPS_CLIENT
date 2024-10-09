import { jwtDecode, JwtPayload } from "jwt-decode";
interface CustomJwtPayload extends JwtPayload {
  id: string;
}
export const verifyToken = (token: string): CustomJwtPayload => {
  return jwtDecode(token);
};
