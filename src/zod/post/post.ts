import { z } from "zod"
import { LikeSchemaWithoutRelation } from "../likes/like"

// id: number
// title: string // On ne l'a pas en db lui.

// postTypeChoice?: object
// image: string
// tags: Tag[]
// date: string // On ne l'a pas en db lui, on a createdAt et updatedAt
// likes: any[]
// comments: number
// shares: number
// bookmarks: number // On ne l'a pas lui c'est quoi?

const postTagCoreSchema = z.object({
  tagName: z.string(),
})

// Thats is the core post schema.
const postCoreSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  views: z.number().nullable(),
  shared: z.number().nullable(),
  repost: z.number().nullable(),
  userId: z.coerce.number(),
  modo_status: z.enum(["PENDING", "VALIDATED", "MODERATED"]),
  user_status: z.enum(["DRAFT", "ARCHIVED", "PUBLISHED"]),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  _count: z.object({
    likes: z.number().nullable(),
    comments: z.number().nullable(),
  }),
})

const postTypeChoiceCoreSchema = z.object({
  type: z.enum(["MEDIA", "TEXT", "SHAREDPOST", "SHAREDPROFILE", "SHAREDMEDIA"]),
})

// If post doesnot exist, if he's creating we use all the schema with no Id
const postContentSchemaNoId = z.object({
  postTypeId: z.coerce.number(),
  content: z.string(),
})
const postTypeChoiceSchemaNoId = z.object({
  ...postTypeChoiceCoreSchema.shape,
  content: z.array(postContentSchemaNoId),
})

// Here we have the final post schema when used without any relation and no id
export const postSchemaNoRelationNoId = z.object({
  ...postCoreSchema.shape,
  postTypeChoice: z.array(postTypeChoiceSchemaNoId),
  tags: z.optional(z.array(postTagCoreSchema)),
})

// Now we have the schemas with ID, here the post exist, but he can be used with or without relations.
const postContentSchemaWithId = postContentSchemaNoId.extend({ id: z.coerce.number() })

const postTagWithId = postTagCoreSchema.extend({
  id: z.optional(z.coerce.number()),
  postId: z.coerce.number(),
})

const postTypeChoiceSchemaWithId = z.object({
  id: z.coerce.number(),
  postId: z.coerce.number(),
  ...postTypeChoiceCoreSchema.shape,
  content: z.array(postContentSchemaWithId),
})
// final post schema when used with no relations but id. Post exists
export const postSchemaNoRelationWithId = z.object({
  id: z.coerce.number(),
  ...postCoreSchema.shape,
  tags: z.array(postTagWithId),
  postTypeChoice: z.array(postTypeChoiceSchemaWithId),
})

// ADD THE RELATION

const postComment = z.object({})

const postUser = z.object({})
// Add the relation to post Schema.
const postSchemaExistingWithRelation = postSchemaNoRelationWithId.extend({
  comments: z.optional(z.array(postComment)),
  likes: z.optional(z.array(LikeSchemaWithoutRelation)),
  user: z.optional(postUser),
})

// Then we have 3 post Schema without relations
// First is no existing post, when creating // Here i put the export type for it
export type PostSchemaNotExistingNoRelation = z.infer<typeof postSchemaNoRelationNoId>
// Second is existing post, when get or updating // Here i put the export type for it
export type PostSchemaExistingNoRelation = z.infer<typeof postSchemaNoRelationWithId>
// Third is existing post when all relations, optional
export type PostSchemaWithRelation = z.infer<typeof postSchemaExistingWithRelation>
