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
        <h1 className="text-2xl">{label}</h1>
        <div className="w-1 h-full bg-secondary rounded-xl border-border" />
        <Button variant={"link"} className="pl-1 text-accent" asChild>
          <Link to={`/${urlName}/create`}>Create</Link>
        </Button>
      </div>
    </div>
  );
}
