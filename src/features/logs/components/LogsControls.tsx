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
      <div className="flex items-center h-12 gap-3">
        <Switch
          id="toggle-startup-logs"
          checked={hideStartup}
          onCheckedChange={setHideStartup}
        />
        <Label htmlFor="toggle-startup-logs" className="text-lg">
          Toggle Startup Logs
        </Label>
      </div>
    </div>
  );
}
