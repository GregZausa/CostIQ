import { Checkbox } from "@headlessui/react";
import { Check } from "lucide-react";

const HeadlessUICheckbox = ({ checked, onChange }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <Checkbox
        checked={checked}
        onChange={onChange}
        className="group flex size-5 items-center justify-center rounded-md border border-slate-600 bg-white 
        data-checked:bg-slate-800 data-checked:border-slate-800 
        focus:outline-none focus:ring-2 focus:ring-slate-700"
      >
        <Check className="hidden size-4 text-white group-data-checked:block" />
      </Checkbox>
    </div>
  );
};

export default HeadlessUICheckbox;
