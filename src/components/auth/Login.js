// src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import "../../css/Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError('Failed to log in');
    }
  };

  return (

      
    <div className='maincont'>
    <Typography variant="h4">Log In</Typography>
    
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <div className='btn'>
        <Button type="submit" variant="contained" color="primary"style={{backgroundColor: "black",color:"white",margin:"8px"}}>
          Log In
        </Button>
        <Button onClick={()=>{navigate('/signup')}} variant="contained" color="primary"style={{backgroundColor: "black",color:"white",margin:"8px"}}>
          Register
        </Button></div>
        <div className='err'>{error && <Typography color="error">{error}</Typography>}</div>
      </form>

    </div>
  );
};

export default Login;
