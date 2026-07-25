import "./App.css";
import { AppRouter } from "./AppRouter";
// Concept: App component is the root component of the application
// State changed -> React re-render the components automatically (UI = f(state))
function App() {
  return <AppRouter />;
}

export default App;
