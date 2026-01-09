import { useEffect, useState } from "react";
import { downloadPdf, getOnePackage } from "../api/packageApi";

const PackageDetails = ({ packageId, onBack }) => {
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setLoading(true);
        const res = await getOnePackage(packageId);
        setPkg(res.data.data);
      } catch {
        setError("Failed to load package");
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [packageId]);

  if (loading) return <p>Loading package...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!pkg) return null;

  return (
    <div className="bg-white p-6 rounded shadow">
      <button onClick={onBack} className="text-blue-600 mb-3 cursor-pointer">
        ← Back
      </button>

      <h2 className="text-2xl font-semibold mb-2">{pkg.title}</h2>

      {pkg.imageUrl && (
        <img
          src={pkg.imageUrl}
          alt=""
          className="w-full max-w-md rounded mb-4"
        />
      )}

      <p>{pkg.description}</p>
      <p className="mt-2">
        {pkg.duration} days • ₹{pkg.price}
      </p>

      <h3 className="font-semibold mt-4">Travel Days</h3>
      {pkg.days.map((day) => (
        <div key={day.id} className="mt-2">
          <p className="font-medium">
            Day {day.dayNumber}: {day.title}
          </p>
          <p className="text-sm text-gray-600">{day.description}</p>
        </div>
      ))}

      <button
        onClick={() => downloadPdf(pkg.id)}
        className="mt-4 cursor-pointer bg-green-600 text-white px-4 py-2 rounded"
      >
        Download PDF
      </button>
    </div>
  );
};

export default PackageDetails;
