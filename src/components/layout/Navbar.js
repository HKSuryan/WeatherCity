// import React, { useEffect, useState } from 'react';
// import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

// const Navbar = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const auth = getAuth();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setIsAuthenticated(!!user);
//     });

//     // Cleanup the subscription
//     return () => unsubscribe();
//   }, [auth]);

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         console.log('User signed out');
//       })
//       .catch((error) => {
//         console.error('Error signing out:', error.message);
//       });
//   };

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" style={{ flexGrow: 1 }}>
//           Weather Dashboard
//         </Typography>
//         {isAuthenticated && (
//           <Button color="inherit" onClick={handleLogout}>
//             Logout
//           </Button>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import '../../css/Navbar.css'; 
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    // Cleanup the subscription
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Error signing out:', error.message);
      });
  };

  return (
    
    <AppBar className="appbar"  position="static" style={{width: "100%"}} color="default">
      <Toolbar>
        <img src="logo192.png" alt="Logo" className="logo" />
        <Typography variant="h6" className="title">
          

        </Typography>
        {!isAuthenticated ? (
          <>
            <Button onClick={()=>{navigate('/login')}} variant="contained" style={{backgroundColor: "black",margin:"8px",color:"white"}} color="inherit" className="loginButton">Sign in</Button>
            <Button onClick={()=>{navigate('/signup')}}variant="contained" color="secondary">Register</Button>
          </>
        ) : (
          <>
          <Button color="inherit" onClick={()=>{navigate('/favourite')}} className="navLink">Favourites</Button>
          <Button color="inherit" style={{backgroundColor: "black",color:"white",margin:"8px"}} onClick={handleLogout}>Logout</Button></>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

