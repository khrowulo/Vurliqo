/*
 * Vurliqo - Utility Functions
 * Phase 1: Utility functions for the application
 */

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}