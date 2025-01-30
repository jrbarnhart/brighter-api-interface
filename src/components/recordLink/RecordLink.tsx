import { Link } from "react-router";
import { Button } from "../ui/button";

export default function RecordLink({
  recordBasePath,
  recordId,
  recordName,
}: {
  recordBasePath: string;
  recordId: string | number;
  recordName: string;
}) {
  return (
    <div className="max-w-full overflow-hidden">
      <Button variant={"link"} className="pl-0" asChild>
        <Link
          to={`${recordBasePath}/${recordId.toString()}`}
          className="truncate underline"
        >
          {recordName}
        </Link>
      </Button>
    </div>
  );
}
