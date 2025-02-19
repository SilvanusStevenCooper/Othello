import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import ListContiner from "./_components/list-container";

const BoardIdPage = async ({ params }: { params: { boardId: string } }) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },

    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },

    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContiner boardId={params.boardId} data={lists} />
    </div>
  );
};

export default BoardIdPage;
