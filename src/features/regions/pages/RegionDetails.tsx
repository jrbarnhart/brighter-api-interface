import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import RegionDetailsContent from "../components/RegionDetailsContent";
import UpdateRegionForm from "../components/UpdateRegionForm";

export default function RegionDetails() {
  return (
    <FeatureDetails
      basePath="/regions"
      renderContentFn={RegionDetailsContent}
      updateForm={<UpdateRegionForm />}
      recordName="regions"
      recordLabel="Region"
      deleteNotes="Note: Regions with rooms or skills cannot be deleted. Delete all of their respective rooms or skills first."
    />
  );
}
