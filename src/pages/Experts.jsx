import { useEffect, useState } from "react";

import { API } from "../api/api";

import ExpertCard from "../components/ExpertCard";


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
  <div className="container" style={{ paddingTop: "40px" }}>
    <h1 className="heading">Find Experts</h1>

    <div className="search-container">
      <input
        type="text"
        placeholder="Search experts"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="input"
      />

      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="select"
      >
        <option value="">Category</option>
        <option value="Developer">Developer</option>
        <option value="Doctor">Doctor</option>
      </select>
    </div>

    {loading ? (
      <h2>Loading...</h2>
    ) : (
      experts.map(expert => (
        <ExpertCard key={expert._id} expert={expert} />
      ))
    )}

    <div className="pagination">
      <button
        className="btn"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>

      <h3>
        Page {page} of {totalPages}
      </h3>

      <button
        className="btn"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  </div>
);
}

export default Experts;