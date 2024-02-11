import { z } from "zod";

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
