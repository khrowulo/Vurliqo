/*
 * Vurliqo - Input Component
 * Phase 1: Reusable input component
 */

function Input({ type = "text", className, children, ...props }) {
  return (
    <input
      type={type}
      className={
        "appearance-none rounded-md border-gray-300 py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-600 sm:text-sm"
      }
      {...props}
    />
  );
}

Input.displayName = "Input";