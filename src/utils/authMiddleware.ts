import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedUser extends JwtPayload {
  id: string;
}

export const authenticate = async (
  req: NextRequest
): Promise<AuthenticatedUser | NextResponse> => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthenticatedUser;
    return decoded;
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
};
