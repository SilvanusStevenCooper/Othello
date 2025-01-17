"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyList } from "./schema";
import { redirect } from "next/navigation";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { createAuditLog } from "@/lib/create-audit-log";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "unauthorized",
    };
  }

  const { id, boardId } = data;

  let newList;
  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },

      include: {
        cards: true,
      },
    });

    if (!listToCopy) {
      return { error: "List not found" };
    }

    // find the last list in the board
    const lastList = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: "desc",
      },

      select: {
        order: true,
      },
    });

    // generate the order for the incoming list
    const newOrder = lastList ? lastList?.order + 1 : 1;

    // copy list functionality
    newList = await db.list.create({
      data: {
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} -copy`,
        order: newOrder,
        cards:
          listToCopy.cards.length > 0
            ? {
                createMany: {
                  data: listToCopy.cards.map((card) => ({
                    title: card.title,
                    description: card.description,
                    order: card.order,
                  })),
                },
              }
            : undefined,
      },

      include: {
        cards: true,
      },
    });

    // for the activity page
    await createAuditLog({
      entityId: newList.id,
      entityTitle: newList.title,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
    });
  } catch (error) {
    console.log("An error occurred while copying a list: ", error);
    return {
      error: "Failed to copy",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: newList };
};

export const copyList = createSafeAction(CopyList, handler);
