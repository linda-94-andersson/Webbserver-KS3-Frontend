import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

const App = React.lazy(() => import("./App"));
const Chat = React.lazy(() => import("./components/Chat"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<App />} />
          <Route path="/chat" exact element={<Chat />} />
          <Route>404 Not Found!</Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
