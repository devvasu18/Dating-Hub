import React, { useEffect } from "react";
import axios from "axios";

const sampleUsers = [

];


const AddSampleUsers = () => {
  useEffect(() => {
    const sendSampleUsersToDB = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/add-sample-users", {
          users: sampleUsers,
        });
        console.log("Sample users added:", res.data);
      } catch (error) {
        console.error("Failed to add sample users", error);
      }
    };

    sendSampleUsersToDB();
  }, []);

  return (
    <div className="text-center mt-5">
      <h2>Adding Sample Users...</h2>
    </div>
  );
};

export default AddSampleUsers;
