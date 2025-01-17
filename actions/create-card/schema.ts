import z from "zod";

export const CreateCard = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(2, {
      message: "Title must be at least 2 characters long",
    }),

  listId: z.string(),
  boardId: z.string(),
});
