import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronsUp } from "lucide-react";
import { SetStateAction } from "react";

type LogsControlsProps = {
  hideStartup: boolean;
  setHideStartup: React.Dispatch<SetStateAction<boolean>>;
  setExpandedRows: React.Dispatch<SetStateAction<number[]>>;
};

export default function LogsControls({ ...props }: LogsControlsProps) {
  const { hideStartup, setHideStartup, setExpandedRows } = props;
  return (
    <div className="flex items-center gap-10">
      <Label
        htmlFor="toggle-startup-logs"
        className="text-lg flex items-center h-12 w-56 gap-3 justify-between cursor-pointer"
      >
        Hide Startup Logs
        <Switch
          id="toggle-startup-logs"
          checked={hideStartup}
          onCheckedChange={setHideStartup}
        />
      </Label>
      <Label
        htmlFor="collapse-all-button"
        className="text-lg flex items-center gap-3 cursor-pointer"
      >
        Collapse All
        <button
          type="button"
          id="collapse-all-button"
          className="h-8 w-8 bg-background flex justify-center items-center rounded-full border border-white/40"
          onClick={() => {
            setExpandedRows([]);
          }}
        >
          <ChevronsUp />
        </button>
      </Label>
    </div>
  );
}
