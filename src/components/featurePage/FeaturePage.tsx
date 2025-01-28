import { Outlet } from "react-router";
import FeatureHeader from "../featureHeader/FeatureHeader";

export default function FeaturePage({
  featureName,
  featureLabel,
}: {
  featureName: string;
  featureLabel: string;
}) {
  return (
    <>
      <div className="h-screen overflow-y-auto relative">
        <FeatureHeader label={featureLabel} urlName={featureName} />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
