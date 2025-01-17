"use client";

import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";
import { useProModel } from "@/hooks/use-pro-model";
import { Button } from "@/components/ui/button";

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const proModal = useProModel();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },

    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    if (isPro) {
      execute({});
    } else {
      proModal.onOpen();
    }
  };

  return (
    <Button onClick={onClick} variant={"primary"} disabled={isLoading}>
      {isPro ? "Manage Subscription" : "Upgrade to PRO"}
    </Button>
  );
};

export default SubscriptionButton;
