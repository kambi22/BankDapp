// Parent.js
import React, { useState } from "react";
import Child from "./child";


const Parent = () => {
  const [user, setUser] = useState("satnam singh");

 const updateUser = () => {
     setUser("Manpreet singh jassa")
 }

  return (
    <div className="App">
      <Child data={user} updateUser={updateUser}/>
    </div>
  );
};

export default Parent;
