"use client";

import { useEffect } from "react";

export default function Home() {

  const callData = async () => {
    const res = await fetch("/api/hello");
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    callData();
  }, []);

  return (
    <>
    </>
  );
}
