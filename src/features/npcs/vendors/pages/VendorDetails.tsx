import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import VendorDetailsContent from "../components/VendorDetailsContent";
import queryKeys from "@/lib/queryKeys";
import { UpdateVendorForm } from "../components/VendorForm";

export default function VendorDetails() {
  return (
    <FeatureDetails
      redirectPath="/npcs/vendors"
      url={`${import.meta.env.VITE_API_URL}/npcs/vendors`}
      RenderContent={VendorDetailsContent}
      UpdateForm={UpdateVendorForm}
      getByIdQueryKey={queryKeys.vendorById}
      deleteQueryKey={queryKeys.vendorById}
      recordLabel="Vendor"
      deleteNotes=""
    />
  );
}
