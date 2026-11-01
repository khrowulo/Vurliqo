/*
 * Vurliqo - Button Component
 * Phase 1: Reusable button component
 */

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Button({ className, variant = "primary", size = "md", children, ...props }) {
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500",
    outline: "border border-gray-500 text-gray-700 hover:bg-gray-50 focus-visible:ring-primary-500",
    ghost: "hover:bg-gray-50 text-gray-700",
  };

  const sizes = {
    sm: "h-8 rounded-md text-sm px-3",
    md: "h-10 rounded-md text-base px-4",
    lg: "h-12 rounded-md text-lg px-6",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

Button.displayName = "Button";