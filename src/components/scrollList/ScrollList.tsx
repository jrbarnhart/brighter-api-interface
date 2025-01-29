import { Link } from "react-router";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

type RequiredItemProperties = {
  id: string | number;
  name?: string;
  description?: string;
};

export default function ScrollList<T extends RequiredItemProperties>({
  title,
  items,
  basePath,
}: {
  title: string;
  items: T[];
  basePath: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl">{title}:</p>
      <ScrollArea className="w-fit max-w-96 min-w-44 h-44 bg-secondary shadow-inner shadow-accent rounded-xl px-3">
        <div className="flex flex-col items-start">
          {items.map((item) => (
            <Button
              key={item.id}
              variant={"link"}
              className="text-base p-0 underline truncate"
              asChild
            >
              <Link to={`/${basePath}/${item.id.toString()}`}>
                {item.name ?? item.id}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
