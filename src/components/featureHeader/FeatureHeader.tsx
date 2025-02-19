import { Link } from "react-router";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/features/auth/components/AuthContext";

export default function FeatureHeader({
  featureLabel,
  featureName,
  noCreate,
}: {
  featureLabel: string;
  featureName: string;
  noCreate?: boolean;
}) {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="p-4 bg-background border-b-2 w-full flex justify-between sticky top-0 z-10">
      <div className="flex flex-col h-8">
        <div className="flex gap-2 items-start h-full">
          <Button variant={"link"} className="pl-0 pr-2" asChild>
            <Link to={`/${featureName}`}>
              <h1 className="text-3xl">{featureLabel}</h1>
            </Link>
          </Button>
          {!noCreate && (
            <>
              <div className="w-1 h-full bg-secondary rounded-xl border-border" />
              <Button
                variant={"link"}
                className="pl-1 text-accent text-xl items-start"
                asChild
              >
                <Link to={`/${featureName}/create`}>Create</Link>
              </Button>{" "}
            </>
          )}
        </div>
      </div>
      {isLoggedIn() ? (
        <p className="text-xl self-end">Logged in! 🚀</p>
      ) : (
        <Button variant={"link"} className="text-xl self-end" asChild>
          <Link to={"/login"}>Log In. 🔐</Link>
        </Button>
      )}
    </div>
  );
}
