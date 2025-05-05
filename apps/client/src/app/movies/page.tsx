import { Suspense } from "react";

import MoviesPage from "./Movies";

export default function Movies() {
  return (
    <Suspense>
      <MoviesPage />
    </Suspense>
  );
}
