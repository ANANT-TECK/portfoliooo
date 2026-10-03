import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 border-2 border-transparent px-5 py-3 font-mono text-xs font-bold uppercase transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-hard hover:-translate-y-0.5",
        default: "bg-primary text-primary-foreground shadow-hard hover:-translate-y-0.5",
        destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
        secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
        ghost: "border-transparent hover:bg-muted hover:text-foreground",
        link: "min-h-0 border-0 p-0 text-primary underline-offset-4 hover:underline",
        outline: "border-border bg-transparent text-foreground hover:border-primary hover:text-primary",
        paper: "bg-paper text-ink shadow-hard hover:-translate-y-0.5",
        icon: "h-12 min-h-12 w-12 border-border bg-surface p-0 text-primary hover:border-primary hover:bg-primary hover:text-primary-foreground",
      },
      size: {
        default: "min-h-11 px-5 py-3",
        sm: "min-h-9 px-3 py-2",
        lg: "min-h-12 px-7 py-3",
        icon: "h-10 min-h-10 w-10 p-0",
        "icon-sm": "h-8 min-h-8 w-8 p-0",
        "icon-lg": "h-12 min-h-12 w-12 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild, onClick, ...props },
  ref,
) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const target = event.currentTarget as HTMLElement;
    const href = target.getAttribute("href") ?? "";
    if (!href.includes("wa.me/")) return;

    const serviceCard = target.closest("article");
    const serviceTitle = serviceCard?.querySelector("h3")?.textContent?.trim();
    if (!serviceTitle) return;

    const service = serviceTitle.toLowerCase();
    let message = "Hi Kaizo, I saw your EDITEDGE portfolio and I'd like to discuss a project.";

    if (service.includes("video editing")) {
      message = "Hi Kaizo, I saw your EDITEDGE portfolio and I'm interested in your Video Editing service. I'd like to discuss my project and get started.";
    } else if (service.includes("color grading")) {
      message = "Hi Kaizo, I saw your EDITEDGE portfolio and I'm interested in your Color Grading service. I'd like to discuss my footage and get started.";
    } else if (service.includes("graphic design")) {
      message = "Hi Kaizo, I saw your EDITEDGE portfolio and I'm interested in your Graphic Design service. I'd like to discuss my design requirements and get started.";
    }

    event.preventDefault();
    window.open(`https://wa.me/919058729619?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const Component = asChild ? Slot : "button";
  return <Component ref={ref} className={cn(buttonVariants({ variant, size }), className)} onClick={handleClick} {...props} />;
});