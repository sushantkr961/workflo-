import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import { connectDB } from "@/utils/db";

connectDB();

export const POST = async (req: NextRequest) => {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// export const GET = async () => {
//   try {
//     const users = await User.find({});
//     return NextResponse.json(users, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// };
