"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { PaginationInput } from "@/components/shared/pagination-input";
import jsCookie from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";
import { useMovies } from "@/hooks/useMovies";
import Link from "next/link";
import { PageLayout } from "@/components/shared/page-layout";
import LoadingSpinner from "@/components/shared/loading-spinner";

export default function Home() {
  const router = useRouter();
  const empty = false;
  const params = useSearchParams();
  const currentPage = Number(params.get("page")) || 1;

  const [page, setPage] = useState(currentPage);
  const [limit, setLimit] = useState(8);

  const { status } = useLogin();
  const { movies, isLoading } = useMovies({
    page,
    limit,
  });

  if (!status) {
    router.push("/login");
  }

  const onPaginationChange = (page: number, limit: number) => {
    setPage(page);
    setLimit(limit);
  };

  const logout = () => {
    jsCookie.remove("token");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <main className="flex flex-col bg-background-color h-full h-screen justify-between">
        <div className="flex h-full flex-col items-center justify-center p-10">
          <div className="flex flex-col justify-center items-center">
            <div>
              <LoadingSpinner />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (movies.data.length === 0) {
    return (
      <main className="flex flex-col bg-background-color h-full h-screen justify-between">
        <div className="flex h-full flex-col items-center justify-center p-10">
          <div className="flex flex-col">
            <div className="mb-10">
              <h1 className="text-center text-3xl font-bold">
                Your movie list is empty
              </h1>
            </div>
            <Link href="/create" className="flex justify-end gap-2">
              <Button
                className="w-full bg-button-background-color text-button-foreground hover:bg-button-hover-color hover:text-button-hover-foreground h-10"
                size="xxs"
                variant="secondary"
              >
                Add a new movie
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <PageLayout fullScreen={false}>
      <main className="flex flex-col bg-background-color h-full min-h-screen justify-between">
        <div className="flex justify-between w-full p-5 pt-10">
          <div className="flex flex-row">
            <h1 className="text-3xl pr-3">My movies</h1>
            <Link className="flex" href="/create">
              <Image
                src="/images/add-icon.svg"
                alt="add-icon"
                width={25}
                height={25}
              />
            </Link>
          </div>
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() => logout()}
          >
            <h2 className="pr-2 hidden sm:block">Logout</h2>
            <Image
              src="/images/logout-icon.svg"
              alt="add-icon"
              width={25}
              height={25}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 pt-10">
          {movies.data.map((item) => (
            <Link
              href={`/edit/${item.id}`}
              key={item.id}
              className="flex flex-col items-center rounded-md shadow-md h-64 lg:h-96 m-1 lg:m-3 bg-card-background-color cursor-pointer hover:bg-card-hover-color"
            >
              <div className="flex flex-col justify-end w-full lg:p-2">
                <div className="h-44 lg:h-72 w-full relative rounded">
                  <Image
                    src={item.imageUrl}
                    alt="movie-icon"
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>

                <div className="p-1">
                  <h3 className="lg:text-xl lg:p-2">
                    {item.title.length > 12
                      ? item.title.substring(0, 15) + "..."
                      : item.title}
                  </h3>
                  <p className="lg:p-2">{item.publishingYear}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="m-10">
          <PaginationInput
            meta={movies.meta}
            onPaginationChange={onPaginationChange}
          />
        </div>
      </main>
    </PageLayout>
  );
}
