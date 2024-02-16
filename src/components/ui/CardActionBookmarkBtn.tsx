"use client"
import { startTransition, useEffect, useOptimistic, useState } from "react"
import { Form } from "./form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateBookmarkSchema } from "@/zod/bookmarks/bookmark"
import { z } from "zod"
import ActionIcon from "../ActionIcon"
import { Bookmark } from "lucide-react"
import { cn } from "@/lib/utils"
import { bookmark } from "../../../actions/bookmarks/post-bookmark"
import { AuthModal } from "../modals/auth/AuthModal"


interface UserPostBookmarks {
  bookmarks: number[] | [];
}

interface CardActionBookmarkBtnProps {
  post: any;
  userId: number;

  // userBookmarksLikes: UserPostLikes & UserPostBookmarks;
  userBookmarks: number[];
}


export default function CardActionBookmarkBtn(props: CardActionBookmarkBtnProps) {
  const { post, userId, userBookmarks = [] } = props

  const [openModale, setOpenModale] = useState(false);

  
  const predicate = (bookmark: UserPostBookmarks) => bookmark === post.id
  const [optimisticBookmarks, addOptimisticBookmark] = useOptimistic<UserPostBookmarks[]>(
    userBookmarks,
    // @ts-ignore
    (state: UserPostBookmarks[], newBookmark: UserPostBookmarks) =>
      state.some(predicate)
        ? state.filter((bookmark) => bookmark !== post.id)
        : [...state, newBookmark]
  )

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      userId: userId
    });
  }, [userId]);

  const form = useForm<z.infer<typeof CreateBookmarkSchema>>({
    resolver: zodResolver(CreateBookmarkSchema),
    defaultValues: {
      postId: post.id,
      userId: userId,
    }
  })
 
  useEffect(() => {
    if (form.formState.errors.userId && form.formState.errors.userId.message === "Expected number, received null") {
      setOpenModale(true)
      return;
    }
  }, [form.formState.errors])

  // useEffect(() => {
  //   if (userBookmarksLikes && Array.isArray(userBookmarksLikes.bookmarks)) {
  //     startTransition(() => {
  //       addOptimisticBookmark(bookmark)
  //     });
  //   }
  // }, [userBookmarksLikes]);

  const onSubmit = async (data: z.infer<typeof CreateBookmarkSchema>) => {
    startTransition(() => {
      addOptimisticBookmark(post.id)
    });
    const response = await bookmark({
      postId: post.id,
      userId: userId
    })
    if (response.error && response.error.code === 403) {
      return;
    } else if (response.error && response.error.code !== 403) {
      return;
    }
  }

  return (
    <>
      <AuthModal
        isOpen={openModale}
        onClose={() => setOpenModale(false)}
      />
      <div className="flex flex-col gap-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <ActionIcon className="h-7 w-7
        hover:bg-transparent !transition-none
        ">
              <Bookmark
                className={cn('h-6 w-6 transition-none text-gray-400', optimisticBookmarks.some(predicate) ? "text-gray-100 fill-gray-100" : "")}
              />
            </ActionIcon>
          </form>
        </Form>
      </div>
    </>
  )
}
