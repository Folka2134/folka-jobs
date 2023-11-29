// firebaseService.ts

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { JobPosting } from './types';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "folka-jobs.firebaseapp.com",
  projectId: "folka-jobs",
  storageBucket: "folka-jobs.appspot.com",
  messagingSenderId: "42848083100",
  appId: "1:42848083100:web:c1c51e2d380d841c9f6159",
  measurementId: "G-6DKBY9SF37",
};

export const fireBaseApp = initializeApp(firebaseConfig);
export const fireBasedb = getFirestore(fireBaseApp);


export const getJobs = async () => {
  try {
    const colRef = collection(fireBasedb, "jobs")
    const snapshot = await getDocs(colRef)

    const jobPostings: JobPosting[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      companyName: doc.data().companyName,
      title: doc.data().title,
      description: doc.data().description,
      roles: doc.data().roles,
      roleType: doc.data().roleType,
      image: doc.data().image,
      location: doc.data().location,
      featured: doc.data().featured,
      createdAt: doc.data().createdAt,
      formattedDate: new Date(doc.data().createdAt.seconds * 1000).toLocaleDateString(),
    }))

    return jobPostings
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error
  }
};

export const postJob = async (jobData: any) => {
  try {
    const jobCollection = collection(fireBasedb, "jobs")
    const docRef = await addDoc(jobCollection, jobData)
    console.log("Document written with ID: ", docRef.id);
    return docRef.id
  } catch (error) {
    console.log("Error adding document: ", error);
    throw error
  }
}