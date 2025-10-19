import React from "react";
import CompanyCard from "./CompanyCard";

export default function CompaniesGrid({ data }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map(c => <CompanyCard key={c.id} company={c} />)}
    </div>
  );
}
