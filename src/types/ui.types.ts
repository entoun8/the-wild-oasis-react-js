import { type ReactNode } from "react";
import type { BookingWithGuestAndCabin } from "./database.types";

// UI Component prop types
export interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary: () => void;
}

export interface ConfirmDeleteProps {
  resourceName: string;
  onConfirm: () => void;
  disabled: boolean;
  onCloseModal?: () => void;
}

export interface HeaderProps {
  onToggleSidebar?: () => void;
}

export interface SidebarProps {
  onClose?: () => void;
}

export interface MainNavProps {
  onItemClick?: () => void;
}

export interface FilterProps {
  filterField: string;
  options: { value: string; label: string; }[];
}

export interface SortByProps {
  options: { value: string; label: string; }[];
}

export interface PaginationProps {
  count: number;
}

export interface StatProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  color?: string;
}

export interface DashboardBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface BookingDataBoxProps {
  booking: BookingWithGuestAndCabin;
}