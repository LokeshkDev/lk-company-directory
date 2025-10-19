import React, { useState, useEffect, useMemo } from "react";
import Header from "./Header";
import Filters from "./Filters";
import CompaniesGrid from "./CompaniesGrid";
import CompaniesTable from "./CompaniesTable";
import ResultsSummary from "./ResultsSummary";

const PAGE_SIZE = 6;

const sortCompanies = (list, key) => {
  const arr = [...list];
  switch (key) {
    case "name_asc":
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    case "name_desc":
      return arr.sort((a, b) => b.name.localeCompare(a.name));
    case "employees_asc":
      return arr.sort((a, b) => (a.employees || 0) - (b.employees || 0));
    case "employees_desc":
      return arr.sort((a, b) => (b.employees || 0) - (a.employees || 0));
    default:
      return arr;
  }
};

export default function CompaniesDirectory() {
  const [companies, setCompanies] = useState([]);
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("all");
  const [location, setLocation] = useState("all");
  const [sort, setSort] = useState("name_asc");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/mock/companies.json");
        const data = await res.json();
        setCompanies(data.companies || data);
      } catch {
        console.error("Failed to load companies");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => setPage(1), [query, industry, location, sort]);

  const filtered = useMemo(() => {
    let list = companies;
    if (query) list = list.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
    if (industry !== "all") list = list.filter((c) => c.industry === industry);
    if (location !== "all") list = list.filter((c) => c.location === location);
    return sortCompanies(list, sort);
  }, [companies, query, industry, location, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const startIdx = (page - 1) * PAGE_SIZE;
  const paged = filtered.slice(startIdx, startIdx + PAGE_SIZE);

  const industries = [...new Set(companies.map((c) => c.industry))];
  const locations = [...new Set(companies.map((c) => c.location))];

  const handlePageChange = (num) => {
    if (num >= 1 && num <= totalPages) setPage(num);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Header />
        <Filters
          query={query}
          setQuery={setQuery}
          industry={industry}
          setIndustry={setIndustry}
          location={location}
          setLocation={setLocation}
          sort={sort}
          setSort={setSort}
          view={view}
          setView={setView}
          industries={industries}
          locations={locations}
        />
        <div className="mt-4 rounded-xl bg-white p-4 shadow">
          {loading ? (
            <div className="py-10 text-center text-gray-500">Loading companies...</div>
          ) : filtered.length === 0 ? (
            <div className="py-10 text-center text-gray-500">No matching companies found.</div>
          ) : (
            <>
              <ResultsSummary total={filtered.length} shown={paged.length} />
              {view === "table" ? <CompaniesTable data={paged} /> : <CompaniesGrid data={paged} />}

              {/* Pagination Section */}
              <div className="mt-6 flex justify-center items-center space-x-2">
                <button
                  className={`px-3 py-1 rounded-md border ${
                    page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 rounded-md border ${
                      page === i + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  className={`px-3 py-1 rounded-md border ${
                    page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
