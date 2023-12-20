import { Schema, model, models, Document } from "mongoose";
import { array } from "zod";

export interface IJob extends Document {
  _id: string;
  company: string;
  recruiter: { _id: string, firstName: string, lastName: string }
  title: string;
  description?: string;
  location?: string;
  imageUrl: string;
  roles: string[];
  roleType: string
  url?: string;
  applicants: string[];
  createdAt: Date;
  startDateTime: Date;
}

const JobSchema = new Schema({
  company: { type: String },
  recruiter: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true},
  description: { type: String },
  location: { type: String },
  imageUrl: { type: String },
  roles: { type: [String] },
  roleType: { type: String},
  url: { type: String },
  applicants: { type: [String]},
  createdAt: { type: Date, default: Date.now },
  startDateTime: { type: Date, default: Date.now },
})

const Job = models.Event || model("Event", JobSchema)

export default Job