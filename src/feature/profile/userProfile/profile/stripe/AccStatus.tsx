import { RefreshCcwIcon } from "lucide-react";

export function AccountStatus({
  status,
  refetch,
}: {
  status: string;
  refetch: () => void;
}) {
  return (
    <div className="flex gap-4">
      <h3 className="font-semibold">
        Account Status:{" "}
        <span
          className={`capitalize ${
            status === "new"
              ? "text-primary"
              : status === "complete"
              ? "text-green-500"
              : "text-warning"
          }`}
        >
          {status}
        </span>
      </h3>
      <button onClick={refetch}>
        <RefreshCcwIcon size={20} className={`text-primary`} />
      </button>
    </div>
  );
}
