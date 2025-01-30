import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import RegionDetailsContents from "../components/RegionDetailsContents";
import UpdateRegionForm from "../components/UpdateRegionForm";

export default function RegionDetails() {
  return (
    <FeatureDetails
      basePath="/regions"
      renderContentFn={RegionDetailsContents}
      updateForm={<UpdateRegionForm />}
      recordName="regions"
      recordLabel="Region"
      deleteNotes="Note: Regions with rooms or skills cannot be deleted. Delete all of their respective rooms or skills first."
    />
  );
}
