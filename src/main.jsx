import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./index.css";

const App = React.lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <RecoilRoot>
                <App />{" "}
              </RecoilRoot>
            }
          />
          <Route>404 Not Found!</Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
