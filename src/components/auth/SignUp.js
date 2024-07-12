// src/components/Auth/Signup.js
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a document for the user in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        favoriteCities: []
      });
      navigate('/');

    } catch (error) {
      console.error('Error creating account:', error);

      if (error.code === 'auth/email-already-in-use') {
        setError('Email already in use');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters');
      } else {
        setError('Failed to create an account');
      }
    }
  };

  return (
    <>
    <div className='maincont'>
      <Typography variant="h4">Sign Up</Typography>
      
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
        <Button type="submit" variant="contained" style={{backgroundColor: "black",color:"white",margin:"8px"}} color="primary">
          Sign Up
        </Button>
        <Button onClick={()=>{navigate('/login')}} style={{backgroundColor: "black",color:"white",margin:"8px"}} variant="contained" color="primary">
          Already a user
        </Button></div>
      
        <div className='err'>{error && <Typography color="error">{error}</Typography>}</div>
      </form>

    </div></>
  );
};

export default Signup;
