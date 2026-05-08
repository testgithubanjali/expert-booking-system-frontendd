import { useState } from "react";

import { API } from "../api/api";

function AddExpert() {

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    experience: "",
    rating: "",
    date: "",
    slots: ""
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {

      const payload = {
        name: formData.name,
        category: formData.category,
        experience: Number(formData.experience),
        rating: Number(formData.rating),

        availableSlots: [
          {
            date: formData.date,
            slots: formData.slots.split(",")
          }
        ]
      };

      const { data } = await API.post("/experts", payload);

      console.log(data);

      alert("Expert Added Successfully");

      setFormData({
        name: "",
        category: "",
        experience: "",
        rating: "",
        date: "",
        slots: ""
      });

    } catch (error) {

      console.log(error);

      alert("Failed to Add Expert");
    }
  };

  return (
    <div className="form-container">

      <h1 className="heading">Add Expert</h1>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Expert Name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="slots"
            placeholder="10:00 AM,11:00 AM,12:00 PM"
            value={formData.slots}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="btn">
          Add Expert
        </button>

      </form>
    </div>
  );
}

export default AddExpert;