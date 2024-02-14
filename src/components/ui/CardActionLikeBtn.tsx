"use client"
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { startTransition, useEffect, useOptimistic } from "react"
import { z } from "zod";
import ActionIcon from "../ActionIcon";
import { like } from "../../../actions/post-like.server";
import { Form } from "./form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LikeWithoutRelation, StoreLikeSchema } from "@/zod/likes/like";
import { toast } from "sonner";


interface CardActionLikeBtnProps {
  itemType: string;
  item: any;
  userId: number;
}
export default function CardActionLikeBtn(props: CardActionLikeBtnProps) {
  const { itemType, item, userId } = props;
  const toastNoAuth = () => {
    return toast.error('Vous devez être connecté pour aimer un post')
  }
  const predicate = (like: LikeWithoutRelation) => like.userId === userId && like.likedItemId === item.id 
  // && like.likeType === itemType
  const [optimisticLikes, addOptimisticLike] = useOptimistic<LikeWithoutRelation[]>(
    item.likes,
    // @ts-ignore
    (state: LikeWithoutRelation[], newLike: LikeWithoutRelation) =>
      state.some(predicate)
        ? state.filter((like) => like.userId !== userId)
        : [...state, newLike]
  )

  const form = useForm<z.infer<typeof StoreLikeSchema>>({
    resolver: zodResolver(StoreLikeSchema),
    defaultValues: {
      likedItemId: item.id,
      userId: userId,
      likeType: itemType
    }
  })
  useEffect(() => {
    if(form.formState.errors.userId && form.formState.errors.userId.message === "Expected number, received null"){
      toastNoAuth()
      return;
    }
  }, [form.formState.errors])

  const onSubmit = async (data: z.infer<typeof StoreLikeSchema>) => {
    const likedItemId = data.likedItemId;
    const userId = data.userId;
    const itemType = data.likeType;

    startTransition(() => {
      addOptimisticLike({
        likedItemId, 
        userId, 
        itemType
      })
    });
 
    const response = await like(data);
    if (response.error && response.error.code === 403) {
      return;
    } else if (response.error && response.error.code !== 403) {
      return;
    }
  }
  return (
    <div className="flex flex-col gap-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <ActionIcon className="h-7 w-7
        hover:bg-transparent !transition-none
        ">
            <Heart
              className={cn('h-6 w-6 transition-none text-gray-400', optimisticLikes.some(predicate) ? "text-red-600 fill-red-600" : "")}
            />
          </ActionIcon>
        </form>
      </Form>
 
      {optimisticLikes.length > 0 && (
        <small>
          {optimisticLikes.length}{" "}
          {optimisticLikes.length === 1 ? "like" : "likes"}
        </small>
      )}
    </div>
  )
}
