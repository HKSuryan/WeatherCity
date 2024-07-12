import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { useAuth } from '../auth/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../../css/Favourite.css';

const Favourite = () => {
    const [favoriteCities, setFavoriteCities] = useState([]);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchFavorites = async () => {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setFavoriteCities(docSnap.data().favoriteCities);
          }
        };
    
        fetchFavorites();
      }, [currentUser]);
  return (
    <div className='favourite'>
        <div className='fav-heading'>
            <h1>Favourite Cities</h1>
        </div>
        <ul className='fav-list'>
        {favoriteCities.map((city) => (
          <li key={city}><button className="fav-btn" key={city} onClick={() => {navigate('/',{
            state: { selectedCity: city },
            replace: true,
          })}}>
            {city}
          </button></li>
        ))}</ul>
        </div>
    
  )
}

export default Favourite;