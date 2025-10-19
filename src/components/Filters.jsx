import React from "react";

export default function Filters({
  query, setQuery,
  industry, setIndustry,
  location, setLocation,
  sort, setSort,
  view, setView,
  industries, locations
}) {

  const handleClear = () => {
    setQuery("");
    setIndustry("all");
    setLocation("all");
    setSort("name_asc");
    setView("grid");
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow md:flex-row md:items-center md:justify-between">
      
      {/* 🔍 Search + Filters */}
      <div className="flex flex-1 flex-wrap items-center gap-3">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search companies..."
          className="w-full max-w-xs rounded-lg border px-3 py-2 text-sm focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />

        <select
          value={industry}
          onChange={e => setIndustry(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="all">All industries</option>
          {industries.map(i => (
            <option key={i}>{i}</option>
          ))}
        </select>

        <select
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="all">All locations</option>
          {locations.map(l => (
            <option key={l}>{l}</option>
          ))}
        </select>
<select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="rounded-lg border px-2 py-2 text-sm"
        >
          <option value="name_asc">Name A-Z</option>
          <option value="name_desc">Name Z-A</option>
          <option value="employees_desc">Employees ↑</option>
          <option value="employees_asc">Employees ↓</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
       
        <div className="flex items-center gap-1 rounded-lg border bg-gray-50 p-1">
          <button
            onClick={() => setView("grid")}
            className={`rounded-md px-3 py-1 text-sm transition ${
              view === "grid" ? "bg-white shadow" : ""
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("table")}
            className={`rounded-md px-3 py-1 text-sm transition ${
              view === "table" ? "bg-white shadow" : ""
            }`}
          >
            Table
          </button>
        </div>
         <button
          onClick={handleClear}
          className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 transition"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
