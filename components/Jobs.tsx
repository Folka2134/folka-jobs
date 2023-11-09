"use client";

import Image from "next/image";
import { initializeApp } from "firebase/app";

import manage from "../assets/images/manage.svg";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

interface JobPosting {
  id: string;
  companyName: string;
  title: string;
  description: string;
  roles: string[];
  roleType: string;
  image: string;
  location: string;
  featured: boolean;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  formattedDate: string;
}

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "folka-jobs.firebaseapp.com",
  projectId: "folka-jobs",
  storageBucket: "folka-jobs.appspot.com",
  messagingSenderId: "42848083100",
  appId: "1:42848083100:web:c1c51e2d380d841c9f6159",
  measurementId: "G-6DKBY9SF37",
};

// init firebase app
initializeApp(firebaseConfig);
// init services
const db = getFirestore();
// collection ref
const colRef = collection(db, "jobs");

const Jobs = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = getDocs(colRef);

    //     const jobPostings: Job[] = response.doc.map((doc) => {
    //       id: doc.id
    //       companyName: doc.
    //     });

    //     setJobs(data.docs);
    //   } catch (error) {
    //     console.error("Error fetching countries:", error);
    //     setError(
    //       error instanceof Error
    //         ? error
    //         : new Error("An unexpected error occured"),
    //     );
    //   }
    // };

    // fetchData();
    getDocs(colRef).then((snapshot) => {
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
        formattedDate: "",
      }));

      // Format the timestamp and update the job postings
      const formattedJobPostings: JobPosting[] = jobPostings.map((job) => ({
        ...job,
        formattedDate: new Date(
          job.createdAt.seconds * 1000,
        ).toLocaleDateString(),
      }));

      setJobs(formattedJobPostings);
    });
  }, []);

  function howOldIsJob(formattedDate: string): number {
    const jobDate = new Date(formattedDate);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate.getTime() - jobDate.getTime();
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24); // Convert milliseconds to days

    return differenceInDays;
  }

  console.log(jobs);

  return (
    <div className="b flex w-full flex-col items-center">
      <h1 className="text-2xl font-medium">Jobs</h1>
      <p className="flex w-full justify-end">Post Job</p>
      {/* loop over jobs from database */}
      {jobs.map((doc) => (
        <div
          key={doc.id}
          className="flex h-56 w-full min-w-[370px] flex-col justify-evenly p-5 shadow-2xl lg:h-32 lg:flex-row"
        >
          <div className="flex items-center lg:flex-1">
            <Image src={manage} height={90} width={90} alt="Job Logo" />
            <div className="ml-4">
              <div className="flex gap-3">
                <h3>{doc.companyName}</h3>
                {howOldIsJob(doc.formattedDate) > 5 && (
                  <span className="h-7 rounded-2xl bg-green-500 p-1 text-sm text-white">
                    NEW!
                  </span>
                )}
                {doc.featured && (
                  <span className="h-7 items-center justify-center rounded-2xl bg-gray-900 p-1 text-sm text-white">
                    FEATURED
                  </span>
                )}
              </div>
              <h2>{doc.title}</h2>
              <ul className="flex gap-3">
                <li>{doc.formattedDate}</li>
                <li>{doc.roleType}</li>
                <li>{doc.location}</li>
              </ul>
            </div>
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-3 border-t border-black pt-2 lg:flex-1 lg:justify-end lg:border-none lg:pt-0">
            {doc.roles.map((role) => (
              <li key={role} className="rounded-md bg-gray-300 p-1 text-sm">
                {role}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Jobs;
