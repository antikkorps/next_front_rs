import { z } from "zod";

export const LikeSchemaWithoutRelation = z.object({
    id: z.coerce.number(),
    likeType: z.string(),
    likedItemId: z.coerce.number(),
    userId: z.number(),
    createdAt: z.string(),
  });
  
  export type LikeWithoutRelation = z.infer<typeof LikeSchemaWithoutRelation>
  
export const StoreLikeSchema = LikeSchemaWithoutRelation.pick({ likeType: true, likedItemId: true, userId: true });
export type StoreLikeType = z.infer<typeof StoreLikeSchema>
