export interface JobPosting {
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