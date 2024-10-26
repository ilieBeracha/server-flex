import bcrypt from "bcrypt";
import { generateToken } from "../config/jwtHandler";
import { prisma } from "../1-dal/prismaClient";

// Register a new admin
export async function registerAdmin(username: string, password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
    const token = await generateToken({
      id: admin.id,
      username: admin.username,
    });
    return { ...admin, token };
  } catch (error) {
    throw new Error(`Error registering admin: ${error.message}`);
  }
}

// Login an admin
export async function loginAdmin(username: string, password: string) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { username },
    });
    if (!admin) {
      throw new Error("Admin not found");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = generateToken({ id: admin.id, username: admin.username });

    return { token };
  } catch (error) {
    throw new Error(`Error logging in admin: ${error.message}`);
  }
}
