import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AuthorizedRouting from "./routes/routes";

const App = () => {
  return (
    <BrowserRouter>
      <AuthorizedRouting />;
    </BrowserRouter>
  );
};

export default App;
