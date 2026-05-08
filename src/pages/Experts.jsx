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
export default Experts;