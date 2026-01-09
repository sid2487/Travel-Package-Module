import { useState } from "react";
import CreatePackage from "./components/CreatePackage";
import PackageList from "./components/PackageList";
import PackageDetails from "./components/PackageDetails";

function App() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <CreatePackage />
      <hr className="my-8" />

      {!selectedId ? (
        <PackageList onSelect={setSelectedId} />
      ) : (
        <PackageDetails
          packageId={selectedId}
          onBack={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}

export default App;
