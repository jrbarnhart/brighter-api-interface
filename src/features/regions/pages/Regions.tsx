import FeatureHeader from "@/components/featureHeader/FeatureHeader";
import { Outlet } from "react-router";

export default function Regions() {
  return (
    <>
      <FeatureHeader label="Regions" urlName="regions" />
      <div className="pt-16">
        <Outlet />
      </div>
    </>
  );
}
