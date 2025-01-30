import { Route } from "react-router";
import RegionsLayout from "./layouts/RegionsLayout";
import CreateRegionForm from "./components/CreateRegionForm";

export default function RegionsRoutes() {
  return (
    <>
      <Route path="regions" element={<RegionsLayout />}>
        <Route path="create" element={<CreateRegionForm />} />
      </Route>
    </>
  );
}
