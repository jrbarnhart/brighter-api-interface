import FeatureDetails from "@/components/featureDetails/FeatureDetails";
import VendorDetailsContent from "../components/VendorDetailsContent";
import UpdateVendorForm from "../components/UpdateVendorForm";

export default function VendorDetails() {
  return (
    <FeatureDetails
      redirectPath="/npcs/vendors"
      url={`${import.meta.env.VITE_API_URL}/npcs/vendors`}
      renderContentFn={VendorDetailsContent}
      updateForm={<UpdateVendorForm />}
      queryKeyName="vendors"
      recordLabel="Vendor"
      deleteNotes=""
    />
  );
}
