import { Link } from "react-router";
import { Button } from "../ui/button";

export default function FeatureHeader({
  label,
  urlName,
}: {
  label: string;
  urlName: string;
}) {
  return (
    <div className="flex flex-col h-8">
      <div className="flex gap-2 items-start h-full">
        <Button variant={"link"} className="pl-0 pr-2" asChild>
          <Link to={"/regions"}>
            <h1 className="text-3xl">{label}</h1>
          </Link>
        </Button>
        <div className="w-1 h-full bg-secondary rounded-xl border-border" />
        <Button
          variant={"link"}
          className="pl-1 text-accent text-xl items-start"
          asChild
        >
          <Link to={`/${urlName}/create`}>Create</Link>
        </Button>
      </div>
    </div>
  );
}
