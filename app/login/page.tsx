"use client";
import { loginSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { login } from "@/api/auth";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/shared/page-layout";
import LoadingSpinner from "@/components/shared/loading-spinner";

export default function Login() {
  const router = useRouter();
  const [errorMessage, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {},
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true);
    setError("");
    try {
      await login(data);
      router.push("/");
    } catch (error) {
      setError((error as Error).message);
    }
    setLoading(false);
  };

  return (
    <PageLayout fullScreen>
      <div className="flex h-full flex-col items-center justify-center p-10">
        <div className="flex flex-col">
          <div className="mb-10">
            <h1 className="text-center text-3xl font-bold">Sign in</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Email" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>

              {errorMessage && (
                <div>
                  <p className="text-red-500">{errorMessage}</p>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button
                  className="w-full bg-button-background-color text-button-foreground hover:bg-button-hover-color hover:text-button-hover-foreground h-10"
                  size="xxs"
                  variant="secondary"
                  type="submit"
                >
                  {isLoading ? <LoadingSpinner /> : "Sign in"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </PageLayout>
  );
}
