import { Route } from "react-router";
import Regions from "./pages/Regions";
import RegionsForm from "./components/RegionsForm";

export default function RegionsRoutes() {
  return (
    <>
      <Route path="regions" element={<Regions />}>
        <Route path="create" element={<RegionsForm />} />
      </Route>
    </>
  );
}
