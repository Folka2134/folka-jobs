// firebaseService.ts

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, deleteDoc, updateDoc, arrayUnion } from 'firebase/firestore';
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
    const colSnapshot = await getDocs(colRef)

    const jobPostings: JobPosting[] = colSnapshot.docs.map((doc) => ({
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
      createdBy: doc.data().createdBy,
      usersApplied: doc.data().usersApplied
    }))

    return jobPostings
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error
  }
};

export const getJobById = async (jobId: string) => {
  try {
    const docRef = doc(fireBasedb, 'jobs', jobId); // Using 'doc' to create a document reference
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      // Handle the case where the document with the specified ID does not exist
      throw new Error(`Job with ID ${jobId} not found`);
    }

    const jobData = docSnapshot.data();

    const jobPosting: JobPosting = {
      id: docSnapshot.id,
      companyName: jobData.companyName,
      title: jobData.title,
      description: jobData.description,
      roles: jobData.roles,
      roleType: jobData.roleType,
      image: jobData.image,
      location: jobData.location,
      featured: jobData.featured,
      createdAt: jobData.createdAt,
      formattedDate: new Date(jobData.createdAt.seconds * 1000).toLocaleDateString(),
      createdBy: jobData.createdBy,
      usersApplied: jobData.usersApplied
    };

    return jobPosting;
  } catch (error) {
    console.error(`Error fetching job with ID ${jobId}:`, error);
    throw error;
  }
};

export const postJob = async (jobData: any, onSuccess?: () => void) => {
  try {
    const jobCollection = collection(fireBasedb, "jobs")
    const docRef = await addDoc(jobCollection, jobData)
    
    if (onSuccess) {
      onSuccess();
    }
    
    console.log("Document written with ID: ", docRef.id);
    // return docRef.id
  } catch (error) {
    console.log("Error adding document: ", error);
    throw error
  }
}

export const deleteJob = async (jobId: string, onSuccess?: () => void) => {
  try {
    const docRef = doc(fireBasedb, 'jobs', jobId);
    await deleteDoc(docRef);

    if (onSuccess) {
      onSuccess();
    }

    console.log(`Job with ID ${jobId} successfully deleted`);
  } catch (error) {
    console.error(`Error deleting job with ID ${jobId}:`, error);
    throw error;
  }
};

export const applyToJob = async (jobId: string, email : string) => {
  try {
    const docRef = doc(fireBasedb, 'jobs', jobId);
    await updateDoc(docRef, { usersApplied: arrayUnion(email) });
    console.log("Application successful!");
  } catch (error) {
    console.error(`Error applying to the job posting:`, error);
    throw error;
  }
}