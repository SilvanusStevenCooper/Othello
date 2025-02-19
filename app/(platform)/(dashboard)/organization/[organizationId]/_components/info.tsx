"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { checkSubscription } from "@/lib/subscription";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface InfoProps {
  isPro: boolean;
}
const Info = ({ isPro }: InfoProps) => {
  const { organization, isLoaded } = useOrganization();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  });

  if (!isMounted) {
    return null;
  }

  if (!isLoaded) {
    return <Info.Skeleton />;
  }
  return (
    <div className="flex items-center gap-x-4">
      <div className="h-[60px] w-[60px] relative">
        <Image
          fill
          src={organization?.imageUrl!}
          alt="organization"
          className="rounded-md object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl">{organization?.name}</p>
        <div className="text-xs flex items-center text-muted-foreground">
          <CreditCard className="h-4 w-4 mr-1" />
          {isPro ? "PRO" : "Free"}
        </div>
      </div>
    </div>
  );
};

export default Info;

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex items-center">
          <Skeleton className="h-4 w-4 mr-2" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};
