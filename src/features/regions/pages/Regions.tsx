import FeatureHeader from "@/components/featureHeader/FeatureHeader";
import { Outlet } from "react-router";

export default function Regions() {
  return (
    <>
      <div className="h-screen overflow-y-auto relative">
        <FeatureHeader label="Regions" urlName="regions" />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
