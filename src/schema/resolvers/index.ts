import { Context } from '../../context';
import { getUserByEmail } from '../../db/queries/user';
import { AuthResponse, LoginUserInput, User } from '../../types';
import { createToken, verifyPassword } from '../../utils';

export const defaultResolvers = {
  Query: {
    me: (_: void, __: void, { user }: Context) => user,
  },

  Mutation: {
    async login(
      _: void,
      { input }: { input: LoginUserInput }
    ): Promise<AuthResponse> {
      const { email, password } = input;
      if (!email || !password) {
        throw new Error('Please provide valid credentials.');
      }

      const user = await getUserByEmail(email);
      if (!user) {
        throw new Error('Invalid credentials.');
      }

      const valid = await verifyPassword(password, user.password!);
      if (valid) {
        const token = await createToken(user);
        return {
          user,
          token,
        };
      } else {
        throw new Error('Invalid credentials.');
      }
    },
  },

  User: {
    firstName: ({ first_name }: User) => first_name,
    lastName: ({ last_name }: User) => last_name,
    createdAt: ({ created_at }: User) => created_at,
    updatedAt: ({ updated_at }: User) => updated_at,
  },
};

export default defaultResolvers;
