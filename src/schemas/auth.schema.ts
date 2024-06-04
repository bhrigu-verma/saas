import { ZodType, z } from 'zod'

export type UserRegistrationProps = {
  type: string
  fullname: string
  email: string
  confirmEmail: string
  password: string
  confirmPassword: string
  otp: string
}

/**
 * Represents the schema for user registration.
 */
export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z
  .object({
    /**
     * The type of user.
     */
    type: z.string().min(1),

    /**
     * The full name of the user.
     */
    fullname: z
      .string()
      .min(4, { message: 'your full name must be at least 4 characters long' }),

    /**
     * The email address of the user.
     */
    email: z.string().email({ message: 'Incorrect email format' }),

    /**
     * The confirmation email address of the user.
     */
    confirmEmail: z.string().email(),

    /**
     * The password of the user.
     */
    password: z
      .string()
      .min(8, { message: 'Your password must be at least 8 characters long' })
      .max(64, {
        message: 'Your password cannot be longer than 64 characters long',
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'password should contain only alphabets and numbers'
      ),

    /**
     * The confirmation password of the user.
     */
    confirmPassword: z.string(),

    /**
     * The one-time password (OTP) of the user.
     */
    otp: z.string().min(6, { message: 'You must enter a 6 digit code' }),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((schema) => schema.email === schema.confirmEmail, {
    message: 'Your emails do not match',
    path: ['confirmEmail'],
  });

export type UserLoginProps = {
  email: string
  password: string
}

export type ChangePasswordProps = {
  password: string
  confirmPassword: string
}

export const UserLoginSchema: ZodType<UserLoginProps> = z.object({
  email: z.string().email({ message: 'You did not enter a valid email' }),
  password: z
    .string()
    .min(8, { message: 'Your password must be atleast 8 characters long' })
    .max(64, {
      message: 'Your password can not be longer then 64 characters long',
    }),
})

export const ChangePasswordSchema: ZodType<ChangePasswordProps> = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Your password must be atleast 8 characters long' })
      .max(64, {
        message: 'Your password can not be longer then 64 characters long',
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'password should contain only alphabets and numbers'
      ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'passwords do not match',
    path: ['confirmPassword'],
  })
