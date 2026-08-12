import { clsx } from "clsx";
import { CheckCircle2, AlertCircle } from "lucide-react";
import type { ActionState } from "@/lib/cms/actions/types";

export function FormMessage({ state }: { state: ActionState }) {
  if (!state || !state.message) return null;
  return (
    <div
      role="status"
      className={clsx(
        "flex items-center gap-2 rounded-lg px-4 py-3 text-sm",
        state.ok ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
      )}
    >
      {state.ok ? (
        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
      ) : (
        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      )}
      {state.message}
    </div>
  );
}
