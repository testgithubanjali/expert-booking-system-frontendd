import { useEffect, useState } from "react";

import { API } from "../api/api";

import ExpertCard from "../components/ExpertCard";
import Loader from "../components/Loader";

function Experts() {
  const [experts, setExperts] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        setLoading(true);

        const { data } = await API.get(
          `/experts?page=${page}&search=${search}&category=${category}`
        );

        setExperts(data.experts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, [page, search, category]);

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search experts"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{ padding: "8px" }}
        />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div>
          {experts.map(expert => (
            <ExpertCard key={expert._id || expert.id} expert={expert} />
          ))}
        </div>
      )}

      <div style={{ marginTop: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page <= 1}
          style={{ padding: "8px", cursor: page <= 1 ? "not-allowed" : "pointer" }}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page >= totalPages}
          style={{ padding: "8px", cursor: page >= totalPages ? "not-allowed" : "pointer" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Experts;