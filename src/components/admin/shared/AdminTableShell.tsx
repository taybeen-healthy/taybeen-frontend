import React from "react";
import { cn } from "@/lib/utils";

export interface TableHeader {
  label: string;
  className?: string;
}

interface AdminTableShellProps {
  headers: TableHeader[];
  children: React.ReactNode;
  className?: string;
  tableClassName?: string;
}

export const AdminTableShell: React.FC<AdminTableShellProps> = ({
  headers,
  children,
  className = "",
  tableClassName = "",
}) => {
  return (
    <div
      className={cn(
        "bg-white border border-[#C4A482]/20 rounded-2xl overflow-hidden shadow-sm text-left font-poppins",
        className
      )}
    >
      <div className="w-full overflow-x-auto">
        <table className={cn("w-full border-collapse", tableClassName)}>
          <thead>
            <tr className="bg-[#F8E8C9]/35 text-[#5A3E2B] font-bold text-xs uppercase tracking-wider text-left border-b border-[#C4A482]/10 select-none">
              {headers.map((header, idx) => (
                <th key={idx} className={cn("py-4 px-6", header.className)}>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-[#3A2418]">{children}</tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTableShell;
