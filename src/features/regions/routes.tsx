import { Route } from "react-router";
import Regions from "./pages/Regions";
import CreateRegionForm from "./components/CreateRegionForm";

export default function RegionsRoutes() {
  return (
    <>
      <Route path="regions" element={<Regions />}>
        <Route path="create" element={<CreateRegionForm />} />
      </Route>
    </>
  );
}
