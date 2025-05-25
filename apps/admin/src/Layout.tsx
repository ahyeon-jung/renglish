import type { ReactNode } from "react";
import { CheckForApplicationUpdate, Layout as RALayout } from "react-admin";

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);
