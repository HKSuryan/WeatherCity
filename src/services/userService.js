// src/services/userService.js
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const getUserFavorites = async (uid) => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  return userDoc.exists() ? userDoc.data().favoriteCities : [];
};

const addUserFavorite = async (uid, city) => {
  const userDocRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    const updatedFavorites = [...userData.favoriteCities, city];
    await updateDoc(userDocRef, { favoriteCities: updatedFavorites });
  } else {
    await setDoc(userDocRef, { favoriteCities: [city] });
  }
};

export { getUserFavorites, addUserFavorite };
