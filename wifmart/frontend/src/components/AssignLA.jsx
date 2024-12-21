import React, { useState } from "react";
const AssignLA = ({ orderId, currentLA, activeLAs, onAssign }) => {
    const [selectedLA, setSelectedLA] = useState(currentLA?._id || "");
  
    const handleAssign = () => {
        console.log("Selected LA (userId):", selectedLA); // Log selectedLA
        if (!selectedLA) return alert("Please select a Logistics Attendant");
        onAssign(selectedLA); // Pass the correct userId
    };
    
    return (
      <div>
        {activeLAs.length > 0 ? (
          <div className="flex items-center space-x-2">
            <select
              value={selectedLA}
              onChange={(e) => setSelectedLA(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select Logistics Attendant</option>
              {activeLAs.map((la) => (
                <option key={la._id} value={la._id}>
                  {la.email} ({la._id})
                </option>
              ))}
            </select>
            <button
              onClick={handleAssign}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Assign
            </button>
          </div>
        ) : (
          <p className="text-gray-500">No active Logistics Associates available.</p>
        )}
      </div>
    );
  };
  export default AssignLA;
