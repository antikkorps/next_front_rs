import { z } from "zod";
import { signUpFormSchemaValidation } from "./signUp";

const forgotPassSchema = z.object({
    email: z.string().email(),
    cemail: z.string().email(),
})

export const forgotPassFormSchemaValidation = forgotPassSchema.superRefine((val, ctx) => {
    if (val.email !== val.cemail) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["cemail"],
            message: "Mails do not match 😡",
        });
        return false;
    }
    return true;
})

// This schema are usefull to both signIn and signUp forms.
export type ForgotPassForm = z.infer<typeof forgotPassFormSchemaValidation>;


// RESET PART
const resetFormSchema = z.object({
    password: z.string().min(8),
    cpassword: z.string(),
    token: z.string()
})

export const resetPasswordSchemaValidation = resetFormSchema.superRefine((val, ctx) => {
    if (val.password !== val.cpassword) {
    ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cpassword"],
        message: "Password do not match 😡",
    });
    return false;
    }
    return true;
})
export type ResetPassForm = z.infer<typeof resetPasswordSchemaValidation>;
