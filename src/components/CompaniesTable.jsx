import React from "react";

export default function CompaniesTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b bg-gray-100 text-gray-700">
            <th className="px-3 py-2 text-left">Company</th>
            <th className="px-3 py-2 text-left">Industry</th>
            <th className="px-3 py-2 text-left">Location</th>
            <th className="px-3 py-2 text-left">Employees</th>
          </tr>
        </thead>
        <tbody>
          {data.map(c => (
            <tr key={c.id} className="border-b hover:bg-gray-50">
              <td className="px-3 py-2 font-medium text-gray-800">{c.name}</td>
              <td className="px-3 py-2">{c.industry}</td>
              <td className="px-3 py-2">{c.location}</td>
              <td className="px-3 py-2">{c.employees ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
