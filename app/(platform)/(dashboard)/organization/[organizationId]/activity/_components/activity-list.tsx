import ActivityItem from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ActivityList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const auditLog = await db.auditLog.findMany({
    where: {
      orgId,
    },
  });
  return (
    <ol className="space-y-4 mt-4">
      <p className="hidden last:block text-xs text-center text-muted-foreground">
        There are no activitues in this list
      </p>

      {auditLog.map((log) => (
        <ActivityItem key={log.id} data={log} />
      ))}
    </ol>
  );
};

export default ActivityList;

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <div className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[50%] h-14" />
      <Skeleton className="w-[70%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[75%] h-14" />
    </div>
  );
};
