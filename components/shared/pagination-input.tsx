import { type PaginationProps } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationInputProps {
  meta: PaginationProps;
  onPaginationChange: (page: number, limit: number) => void;
}

export const PaginationInput = ({
  meta,
  onPaginationChange,
}: PaginationInputProps) => {
  const router = useRouter();
  const params = useSearchParams();
  const currentPage = Number(params.get("page")) || 1;

  const getCanPreviousPage = () => {
    return meta.page > 1;
  };

  const getCanNextPage = () => {
    return meta.page < meta.totalPages;
  };

  const handlePaginationChange = ({ page = 1, limit = 8 }) => {
    onPaginationChange(page, limit);
  };

  const handlePageChange = (page: number) => {
    if (page < 1) {
      page = 1;
    } else if (page > meta.totalPages) {
      page = meta.totalPages;
    }
    router.push(`?page=${page}`);
    handlePaginationChange({ page });
  };

  const showThirdPageButton = () => {
    if (meta.totalPages > 2 && currentPage < meta.totalPages) {
      return true;
    }
  };

  const showButton2 = () => {
    if (meta.totalPages == 2 && currentPage == 1) {
      return true;
    }
  };

  const showEllipsis = () => {
    if (
      (currentPage < 3 && meta.totalPages > 3) ||
      currentPage < meta.totalPages - 3
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="align-center mt-5 flex justify-center">
      <Pagination>
        <PaginationContent>
          {getCanPreviousPage() && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
          )}
          {currentPage !== 1 && (
            <PaginationItem>
              <PaginationLink
                href={`?page=${currentPage - 1}`}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink isActive>{currentPage}</PaginationLink>
          </PaginationItem>
          {showButton2() && (
            <PaginationItem>
              <PaginationLink
                href={`?page=2`}
                onClick={() => handlePageChange(2)}
              >
                2
              </PaginationLink>
            </PaginationItem>
          )}
          {showThirdPageButton() && (
            <PaginationItem>
              <PaginationLink
                href={`?page=${currentPage + 1}`}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {showEllipsis() && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {getCanNextPage() && (
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
