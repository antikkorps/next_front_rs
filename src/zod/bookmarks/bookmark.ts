import { Book } from "lucide-react";
import { z } from "zod";

export const BookmarkSchema = z.object({
    id: z.coerce.number(),
    postId: z.coerce.number(),
    userId: z.number(),
});

export type BookmarkType = z.infer<typeof BookmarkSchema>;
export const CreateBookmarkSchema = BookmarkSchema.omit({ id: true });
export type CreateBookmarkType = z.infer<typeof CreateBookmarkSchema>;