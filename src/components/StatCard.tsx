import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  value: number | string;
  note: string;
  icon: LucideIcon;
  color: string;
};

export default function StatCard({
  label,
  value,
  note,
  icon: Icon,
  color,
}: Props) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${color}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{note}</p>
      </div>
    </div>
  );
}