import FormPopover from "@/components/form/form-popover";
import Hint from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { HelpCircle, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const BoardList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const board = await db.board.findMany({
    where: {
      orgId: orgId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      {/* boards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {board.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover 
            bg-sky-700 rounded-sm h-full w-full p-2"
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <FormPopover side="right" sideOffset={10}>
          <div
            role="button"
            title="button"
            className="aspect-video h-full p-4 relative w-full bg-muted rounded-sm flex 
          flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          >
            <p className="text-sm">Create New Board</p>
            <span className="text-xs">5 remaining</span>
            <Hint
              sideOffset={20}
              description={`
            Free workspaces can have up to 5 open boards. Upgrade to PRO to get unlimited boards.
            `}
            >
              <HelpCircle className="h-4 w-4 absolute bottom-2 right-2" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

export default BoardList;

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-24 w-44 p-2 bg-black/50" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-black/50" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-black/50" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-black/50" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-black/50" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-black/50" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-black/50" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-black/50" />
    </div>
  );
};
