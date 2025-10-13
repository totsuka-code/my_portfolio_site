import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // ← Tailwind 3行だけのCSS

createRoot(document.getElementById("root")).render(
  // StrictModeは外します（開発時の副作用2回実行を避けるため）
  <App />
);
