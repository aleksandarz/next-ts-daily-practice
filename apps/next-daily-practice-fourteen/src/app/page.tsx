"use client"

import FeatureFlagToggle from "@/app/components/DashboardToggle";
import { useFlagContext } from "@/app/context/FlagContext";

export default function Home() {
  const { flags } = useFlagContext();

  return (
    <>
      <FeatureFlagToggle />

      {flags.newDashboard ? (
        <div className="bg-green-100 p-6">New dashboard - faster and newer</div>
      ) : (
        <div className="bg-gray-100 p-6">Old, reliable dashboard</div>
      )}
    </>
  );
}
