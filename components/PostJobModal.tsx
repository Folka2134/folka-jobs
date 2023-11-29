// "use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { formSchema } from "@/lib/schemas";
import { JobPosting } from "@/lib/types";
import { postJob } from "@/lib/firebaseService";
import { ZodError } from "zod";
import { toast } from "./ui/use-toast";
import { useSession } from "next-auth/react";

const jobRoles = [
  {
    id: "frontend",
    label: "Front-End",
  },
  {
    id: "backend",
    label: "Back-end",
  },
  {
    id: "fullstack",
    label: "Fullstack",
  },
  {
    id: "devops",
    label: "Devops",
  },
  {
    id: "senior",
    label: "Senior",
  },
  {
    id: "junior",
    label: "Junior",
  },
] as const;

const JobModal = ({ setOpenModal, setError }: any) => {
  const [formSubmitting, setFormSubmitting] = useState(false);
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      companyName: "",
      title: "",
      roles: [],
      roleType: "Full-time",
      location: "",
      description: "",
      createdBy: session?.user?.email ?? "",
      createdAt: new Date(),
      // updatedAt: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    postJob(values);
    // console.log(values);
  }

  return (
    <div className="fixed left-0 top-0 flex h-full w-full  items-center justify-center">
      <div className="max-w-84 z-40 h-96 min-w-[400px] overflow-auto rounded-lg bg-white p-5 shadow-2xl">
        <button
          onClick={() => setOpenModal(false)}
          disabled={formSubmitting}
          className="my-2 mb-6 flex h-8 w-20 items-center justify-center gap-2 text-sm shadow-xl md:mb-2"
        >
          Cancel
        </button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input placeholder="Company image" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input placeholder="Job title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roles"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Job roles</FormLabel>
                    <FormDescription>
                      Select the roles you want to display on the job post.
                    </FormDescription>
                  </div>
                  {jobRoles.map((role) => (
                    <FormField
                      key={role.id}
                      control={form.control}
                      name="roles"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={role.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(role.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, role.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: string) => value !== role.id,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {role.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roleType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Role Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Full-time" />
                        </FormControl>
                        <FormLabel className="font-normal">Full-time</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Part-time" />
                        </FormControl>
                        <FormLabel className="font-normal">Part-time</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      {/* <div
        className="overlay absolute z-30 h-full w-full "
        onClick={() => setOpenModal(false)}
      /> */}
    </div>
  );
};

export default JobModal;
