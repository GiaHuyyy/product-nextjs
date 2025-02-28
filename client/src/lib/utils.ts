import { clsx, type ClassValue } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { EntityError } from "./http";
import { toast } from "@/hooks/use-toast";
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, { type: "server", message: item.message });
    });
    toast({
      variant: "destructive",
      title: "Lỗi !",
      description: error?.payload?.message ?? "Lỗi không xác định",
      duration: duration ?? 5000,
    });
  } else {
    toast({
      variant: "destructive",
      title: "Lỗi !",
      description: error?.payload?.message ?? "Lỗi không xác định",
      duration: duration ?? 5000,
    });
  }
};

/**
 * Xóa đi ký tự "/" ở đầu path
 */
export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const decodeJWT = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload;
};
