import React from "react";

export default function ResultsSummary({ total, shown }) {
  return (
    <div className="mb-3 flex flex-col items-center justify-between gap-2 text-sm text-gray-600 md:flex-row">
      <span>{total} companies found</span>
      <span>Showing {shown}</span>
    </div>
  );
}
