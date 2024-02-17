import { z } from "zod";

    const signUpFormSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
        cpassword: z.string()
    })
  
    export const signUpFormSchemaValidation = signUpFormSchema.superRefine((val, ctx) => {
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

    // This schema are usefull to both signIn and signUp forms.
    export const SignUpWithoutConfirmPassword = signUpFormSchema.omit({cpassword: true})
    export type SignUpForm = z.infer<typeof SignUpWithoutConfirmPassword>;
    

    // resend mail confirmation

    export const resendMailSchema = signUpFormSchema.omit({password: true, cpassword: true});
    export type ResendMailForm = z.infer<typeof resendMailSchema>;