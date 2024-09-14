import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toPlainObjectArray<T extends Record<string, any>>(
  arr: T[],
): any[] {
  return arr.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          return [key, toPlainObjectArray([value])[0]];
        }
        return [key, value];
      }),
    ),
  );
}
