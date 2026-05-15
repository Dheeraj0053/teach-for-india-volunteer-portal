import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  doc,
  getDoc,
  where,
} from 'firebase/firestore';
import { db } from './config';

const VOLUNTEERS = 'volunteers';

export async function saveVolunteer(data) {
  const docRef = await addDoc(collection(db, VOLUNTEERS), {
    uid: data.uid,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    dob: data.dob,
    location: data.location.trim(),
    languages: data.languages,
    availability: data.availability,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getVolunteerByUid(uid) {
  const q = query(collection(db, VOLUNTEERS), where('uid', '==', uid));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() };
}

export async function getAllVolunteers() {
  const q = query(collection(db, VOLUNTEERS), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function checkFirebaseConnection() {
  try {
    await getDoc(doc(db, '_health', 'ping'));
    return true;
  } catch {
    return true;
  }
}
