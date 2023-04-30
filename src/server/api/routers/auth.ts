import { z } from "zod";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "../prisma";
import { User } from "@prisma/client";

const generateJwtToken = (user: User) => {
  const secret = process.env.JWT_SECRET as string;
  const expiresIn = '24h';

  const payload: JWTUserPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  return jwt.sign(payload, secret, { expiresIn });
};

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const isValidPassword = await bcrypt.compare(input.password, user.password);

      if (!isValidPassword) {
        throw new Error("Invalid password");
      }

      const token = generateJwtToken(user);
      return { token, user };
    }),
  register: publicProcedure
    .input(z.object({ email: z.string(), password: z.string(), name: z.string() }))
    .mutation(async ({ input }) => {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (existingUser) {
        throw new Error("Email already in use");
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);

      const newUser = await prisma.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
          name: input.name,
        },
      });
      const token = generateJwtToken(newUser);

      return { token, user: newUser };
    }),
});
