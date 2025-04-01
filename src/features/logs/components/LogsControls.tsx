import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SetStateAction } from "react";

type LogsControlsProps = {
  hideStartup: boolean;
  setHideStartup: React.Dispatch<SetStateAction<boolean>>;
};

export default function LogsControls({ ...props }: LogsControlsProps) {
  const { hideStartup, setHideStartup } = props;
  return (
    <div>
      <Label
        htmlFor="toggle-startup-logs"
        className="text-lg flex items-center h-12 w-56 gap-3 justify-between cursor-pointer"
      >
        <Switch
          id="toggle-startup-logs"
          checked={hideStartup}
          onCheckedChange={setHideStartup}
        />
        {hideStartup ? "Show" : "Hide"} Startup Logs
      </Label>
    </div>
  );
}
