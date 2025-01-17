"use client";

import { useEffect, useState } from "react";
import CardModel from "@/components/models/card-model";
import { ProModel } from "../models/pro-model";

const ModleProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CardModel />
      <ProModel />
    </>
  );
};

export default ModleProvider;
