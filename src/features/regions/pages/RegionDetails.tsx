import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import RegionDetailsContent from "../components/RegionDetailsContent";
import { UpdateRegionForm } from "../components/RegionForms";

export default function RegionDetails() {
  return (
    <FeatureDetails
      redirectPath="/regions"
      url={`${import.meta.env.VITE_API_URL}/regions`}
      RenderContent={RegionDetailsContent}
      UpdateForm={<UpdateRegionForm />}
      queryKeyName="regions"
      recordLabel="Region"
      deleteNotes="Note: Regions with rooms or skills cannot be deleted. Delete all of their respective rooms or skills first."
    />
  );
}
