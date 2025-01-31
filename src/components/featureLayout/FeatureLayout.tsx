import { Outlet } from "react-router";
import FeatureHeader from "../featureHeader/FeatureHeader";

export default function FeatureLayout({
  featureName,
  featureLabel,
  noCreate,
}: {
  featureName: string;
  featureLabel: string;
  noCreate?: boolean;
}) {
  return (
    <>
      <div className="h-screen overflow-y-auto relative">
        <FeatureHeader
          featureLabel={featureLabel}
          featureName={featureName}
          noCreate={noCreate}
        />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
