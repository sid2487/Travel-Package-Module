import { useState } from "react";
import { createPackage } from "../api/packageApi";

const CreatePackage = () => {
  const [days, setDays] = useState([
    { dayNumber: 1, title: "", description: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addDay = () => {
    setDays([
      ...days,
      { dayNumber: days.length + 1, title: "", description: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData(e.target);
      formData.append("days", JSON.stringify(days));

      await createPackage(formData);
      alert("Package created successfully");
      e.target.reset();
      setDays([{ dayNumber: 1, title: "", description: "" }]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Create Travel Package
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="input"
            name="title"
            placeholder="Package Title"
            required
          />
          <input
            className="input"
            name="description"
            placeholder="Short Description"
            required
          />
          <input
            className="input"
            name="duration"
            type="number"
            placeholder="Duration (days)"
            required
          />
          <input
            className="input"
            name="price"
            type="number"
            placeholder="Price"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Package Image
          </label>
          <input
            className="block w-full border border-gray-300 rounded-md p-2 cursor-pointer"
            name="image"
            type="file"
          />
        </div>

        <div className="border rounded-lg p-4 bg-gray-50">
          <h4 className="font-semibold mb-4 text-gray-700">Travel Days</h4>

          <div className="space-y-3">
            {days.map((day, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  className="input"
                  placeholder={`Day ${day.dayNumber} Title`}
                  required
                  onChange={(e) => {
                    const copy = [...days];
                    copy[i].title = e.target.value;
                    setDays(copy);
                  }}
                />
                <input
                  className="input"
                  placeholder={`Day ${day.dayNumber} Description`}
                  required
                  onChange={(e) => {
                    const copy = [...days];
                    copy[i].description = e.target.value;
                    setDays(copy);
                  }}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addDay}
            className="mt-4 text-blue-600 text-sm font-medium hover:underline cursor-pointer"
          >
            + Add Another Day
          </button>
        </div>

        <button
          disabled={loading}
          className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-60"
        >
          {loading ? "Creating Package..." : "Create Package"}
        </button>
      </form>
    </div>
  );
};

export default CreatePackage;
