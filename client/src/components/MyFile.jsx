// File: src/components/MyFile.jsx
import React, { useState, useEffect, useContext } from "react";
import { CheckBalance, readValue, writeValue } from "../Web3";
import { Button, Form } from "react-bootstrap";
import { ThemeContext } from "./useContext";


const MyFile = () => {
  const [value, setValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [error, setError] = useState('');
  const [Balance ,setBalance ] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchValue = async () => {
      try {
        const value = await readValue();
        const balance = await CheckBalance();
        setBalance(balance);
        
        setValue(value);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchValue();
  }, []);

  const handleWrite = async (e) => {
    e.preventDefault();
    try {
      const value = await writeValue(newValue);
      setValue(value);
      setNewValue(''); // Clear the input field after writing
      const balance = await CheckBalance();
        setBalance(balance);
    } catch (err) {
      setError(err.message);
    }finally{
      console.log("finally");
      setLoading(false)
    }
  };
  const theme = useContext(ThemeContext);

  const divStyle = {
    backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '20px'
  };
  return (
    <div className="text-center" style={divStyle}>
      <h5>This is from MyFile</h5>
      {loading ? <h5>Loading...</h5> :null}
      {error ? <h5>Error: {error}</h5> : <h5>Value is {value}</h5>}
      <div className= "d-flex justify-content-center">
      <Form.Control className="text-center" style={{width:'200px'}} placeholder="Enter Number" type="Number" name="number" id="number" value={newValue} onChange={(e)=>setNewValue(e.target.value)} />
        <br></br>
        <Button onClick={handleWrite}>Submit</Button>
      </div>

        
      <br></br>
    <h5>Balance is: {Balance}</h5>
    </div>
  );
};

export default MyFile;
