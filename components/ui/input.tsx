import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  append?: React.ReactNode | string;
  prepend?: React.ReactNode | string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, append, prepend, ...props }, ref) => {
    return (
      <div className="flex">
        {prepend && (
          <div
            className={cn(
              "flex items-center rounded-md rounded-r-none border border-r-0 border-input bg-transparent px-3 py-2 text-sm ring-offset-background"
            )}
          >
            {prepend}
          </div>
        )}
        {/* {!prepend && <div className="ml-1" />} */}
        <input
          type={type}
          className={cn(
            "flex h-10 grow rounded-md bg-input-background-color px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            {
              "rounded-l-none border-l-transparent": prepend,
              "rounded-r-none border-r-transparent": append,
            }
          )}
          ref={ref}
          autoComplete="aus"
          data-form-type="other"
          data-lpignore="true"
          {...props}
        />
        {/* {!append && <div className="mr-1" />} */}
        {append && (
          <div
            className={cn(
              "flex items-center rounded-md rounded-l-none border border-l-0 border-input bg-transparent px-3 py-2 text-sm ring-offset-background"
            )}
          >
            {append}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
