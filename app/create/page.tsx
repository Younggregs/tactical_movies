"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { movieSchema, loginSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createMovie, uploadImage } from "@/api/movies";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/shared/page-layout";
import LoadingSpinner from "@/components/shared/loading-spinner";

export default function Create() {
  const router = useRouter();
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof movieSchema>>({
    defaultValues: {},
    resolver: zodResolver(movieSchema),
  });

  const onSubmit = async (data: z.infer<typeof movieSchema>) => {
    setLoading(true);
    if (!file) {
      setError("No image selected");
      setLoading(false);
      throw new Error("No image selected");
    }
    const imageUrl = await uploadFile(file);

    if (!imageUrl) {
      setError("Error uploading image");
      setLoading(false);
      throw new Error("Error uploading image");
    }

    try {
      // create movie
      await createMovie({ ...data, imageUrl });
      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Error creating movie");
    }
    setLoading(false);
  };

  const uploadFile = async (file: File) => {
    try {
      const upload = await uploadImage(file);
      return upload.location;
    } catch (error) {
      console.log(error);
    }

    return null;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [".jpeg", ".png"] },
  });

  return (
    <PageLayout fullScreen={false}>
      <main className="flex flex-col bg-background-color h-80p justify-between">
        <div className="flex flex-row">
          <div className="flex mt-10 p-10 pb-0 lg:w-2/4">
            <h1 className="text-3xl font-bold">Create a new movie</h1>
          </div>
        </div>
        {/* web */}
        <div className="hidden md:block">
          <div className="flex h-full flex-row space-x-10 p-10">
            <div className="flex w-2/4 justify-center p">
              <div
                {...getRootProps()}
                className="flex border border-dashed rounded h-96 w-full bg-input-background-color items-center justify-center cursor-pointer"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="flex flex-col items-center">
                  <input {...getInputProps()} />
                  <Image
                    src="/images/upload.svg"
                    alt="upload-icon"
                    width={25}
                    height={25}
                  />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>Drop an image here</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-2/4 h-96">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="Title" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="publishingYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="Publishing Year" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {error && <p className="text-red-500">{error}</p>}
                  <div className="flex justify-end gap-2">
                    <Button
                      className="w-full border border-white text-button-foreground hover:bg-button-hover-color hover:text-button-hover-foreground h-10"
                      size="xxs"
                      variant="outline"
                      onClick={() => router.push("/")}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="w-full bg-button-background-color text-button-foreground hover:bg-button-hover-color hover:text-button-hover-foreground h-10"
                      size="xxs"
                      variant="secondary"
                      type="submit"
                    >
                      {isLoading ? <LoadingSpinner /> : "Submit"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>

        {/* mobile */}
        <div className="block md:hidden h-full flex-col space-x-10 items-center justify-center p-5">
          <div className="flex flex-col lg:h-96">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Title" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="publishingYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Publishing Year" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex w-full justify-center p">
                  <div
                    {...getRootProps()}
                    className="flex border border-dashed rounded h-96 w-full bg-input-background-color items-center justify-center cursor-pointer"
                    style={{
                      backgroundImage: `url(${backgroundImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <input {...getInputProps()} />
                      <Image
                        src="/images/upload.svg"
                        alt="upload-icon"
                        width={25}
                        height={25}
                      />
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <p>Drop an image here</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    className="w-full border border-white text-button-foreground hover:bg-button-hover-color hover:text-button-hover-foreground h-10"
                    size="xxs"
                    variant="outline"
                    onClick={() => router.push("/")}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="w-full bg-button-background-color text-button-foreground hover:bg-button-hover-color hover:text-button-hover-foreground h-10"
                    size="xxs"
                    variant="secondary"
                    type="submit"
                  >
                    {isLoading ? <LoadingSpinner /> : "Submit"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
