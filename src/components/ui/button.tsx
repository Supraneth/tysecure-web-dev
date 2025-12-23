import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 min-h-[44px]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-glow hover:shadow-[0_0_30px_hsl(38_92%_50%_/_0.5)] hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-border bg-transparent hover:bg-secondary hover:border-primary/50 text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: 
          "hover:bg-secondary hover:text-foreground",
        link: 
          "text-primary underline-offset-4 hover:underline",
        hero:
          "bg-primary text-primary-foreground font-semibold shadow-glow hover:shadow-[0_0_30px_hsl(38_92%_50%_/_0.5)] hover:scale-[1.02] active:scale-[0.98] text-base px-8",
        "hero-outline":
          "border-2 border-border bg-transparent text-foreground font-semibold hover:bg-secondary hover:border-primary/30 text-base px-8",
        cta:
          "bg-gradient-to-r from-primary to-[hsl(45_100%_55%)] text-primary-foreground font-bold shadow-glow hover:shadow-[0_0_40px_hsl(38_92%_50%_/_0.5)] hover:scale-[1.03] active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-14 rounded-xl px-10 text-base",
        xl: "h-16 rounded-xl px-12 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
