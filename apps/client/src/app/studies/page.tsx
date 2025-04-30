import { Suspense } from "react";
import StudiesPage from "./Studies";

export default function Studies() {
  return (
    <Suspense>
      <StudiesPage />
    </Suspense>
  );
}
