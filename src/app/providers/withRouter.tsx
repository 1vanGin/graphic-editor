import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Loader } from "shared/ui";

export const withRouter = (component: () => React.ReactNode) => () => (
  <BrowserRouter>
    <Suspense fallback={<Loader />}>{component()}</Suspense>
  </BrowserRouter>
);
