"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React from "react";
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

const formSchema = z.object({
  image: z.string().url({ message: "Invalid url" }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  title: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  roles: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one role.",
  }),
  roleType: z.enum(["Full-time", "Part-time"], {
    required_error: "You need to select a notification type.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  featured: z.boolean(),
  // createdAt: z.date().safeParse(new Date()),
  // updatedAt: z.date().safeParse(new Date()),
});

const JobModal = ({ setOpenModal }: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      companyName: "",
      title: "",
      roleType: "Full-time",
      roles: [],
      location: "",
      description: "",
      featured: false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
    console.log(values);
  }

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

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
      <div className="max-w-84 z-40 rounded-lg bg-white p-5 shadow-2xl">
        <Button
          onClick={() => setOpenModal(false)}
          className="my-2 mb-6 flex h-8 w-20 items-center justify-center gap-2 text-sm shadow-xl md:mb-2"
        >
          {/* <BsArrowLeft /> */}
          Cancel
        </Button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                          (value) => value !== role.id,
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <div
        className="overlay absolute z-30 h-full w-full "
        onClick={() => setOpenModal(false)}
      />
    </div>
  );
};

export default JobModal;
