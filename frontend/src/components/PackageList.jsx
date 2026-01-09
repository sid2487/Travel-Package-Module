import { useEffect, useState } from "react";
import { getAllPackages } from "../api/packageApi";

const PackageList = ({ onSelect }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await getAllPackages();
        setPackages(res.data.data);
      } catch (err) {
        setError("Failed to load packages");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  if (loading) return <p>Loading packages...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Travel Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="border rounded p-4 shadow hover:shadow-lg"
          >
            <h3 className="font-semibold">{pkg.title}</h3>
            <p>{pkg.duration} days</p>
            <p className="font-medium">₹{pkg.price}</p>
            <button
              onClick={() => onSelect(pkg.id)}
              className="mt-2 text-blue-600 cursor-pointer"
            >
              View Details →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageList;
