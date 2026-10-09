import { clsx, type ClassValue } from "clsx";

/**
 * Junta classes condicionais (padrão shadcn).
 * Se quiser resolver conflitos do Tailwind (ex.: "p-2 p-4"), instale
 * `tailwind-merge` e troque por: twMerge(clsx(inputs)).
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
