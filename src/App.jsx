import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content" aria-label="Main content" />
      <Footer />
    </div>
  );
}

export default App