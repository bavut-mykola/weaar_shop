import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Auth from "./components/Auth";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content" aria-label="Main content" />
      <Footer />
      <Auth />
    </div>
  );
}

export default App;
