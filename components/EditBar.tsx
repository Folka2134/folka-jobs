// "use client";

// import { applyToJob, deleteJob } from "@/lib/firebaseService";
// import { useRouter } from "next/navigation";

// const EditBar = ({ createdBy, id, applicants }: any) => {
//   const router = useRouter();
//   const { data: session } = useSession();

//   var userEmail = session?.user?.email;

//   const handleApply = async (id: string) => {
//     if (userEmail) {
//       await applyToJob(id, userEmail);
//     }
//   };

//   const handleDeleteJob = async () => {
//     try {
//       await deleteJob(id, () => {
//         router.push("/");
//       });
//     } catch (error) {
//       // Handle error, if needed
//     }
//   };

//   return (
//     <div>
//       {userEmail == createdBy ? (
//         <div className="flex gap-3">
//           <button onClick={handleDeleteJob}>Delete</button>
//         </div>
//       ) : (
//         <button onClick={() => handleApply(id)}>
//           <span className="bg-green-400">Apply</span>
//         </button>
//       )}
//     </div>
//   );
// };

// export default EditBar;
