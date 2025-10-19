import React from "react";

export default function CompanyCard({ company }) {
  return (
    <div className="flex flex-col justify-between rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-lg font-semibold text-gray-700">
            {company.name[0]}
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800">{company.name}</h3>
            <p className="text-xs text-gray-500">{company.description}</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-600">{company.industry} • {company.location}</p>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
        <span>{company.employees ? `${company.employees} employees` : "N/A"}</span>
        <button className="rounded-lg border px-3 py-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">View</button>
      </div>
    </div>
  );
}
