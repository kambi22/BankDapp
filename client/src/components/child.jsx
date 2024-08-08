// Child.js
import React from "react";
import { Button } from "react-bootstrap";

const Child = ({ data,updateUser }) => {
  // Example: Update user when a button is clicked
 

  return (
    <div>

      {/* Display data from props */}
      <p>User: {data}</p>
      <Button onClick={updateUser}>update User</Button>
    </div>
  );
};

export default Child;
