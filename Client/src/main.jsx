import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GoogleOAuthProvider>
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter>
);
