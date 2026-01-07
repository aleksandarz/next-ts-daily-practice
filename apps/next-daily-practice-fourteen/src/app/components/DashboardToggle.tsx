"use client";

import { useFlagContext } from "@/app/context/FlagContext";

const DashboardToggle = () => {
  const { flags, toggleFlag } = useFlagContext();

  return (
    <div className="p-8">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={flags.newDashboard}
          onChange={() => toggleFlag("newDashboard")}
        />
        Turn to new dashboard
      </label>

      <div className="mt-6 p-4 border rounded">
        {flags.newDashboard ? (
          <p className="text-green-600">New dashboard</p>
        ) : (
          <p className="text-gray-600">Old dashboard</p>
        )}
      </div>
    </div>
  );
}

export default DashboardToggle;