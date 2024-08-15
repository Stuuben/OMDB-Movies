import "./App.css";
import { Movies } from "./components/Movies";
import { Series } from "./components/Series";
import { Header } from "./components/Header";
import { ShowMovies } from "./components/ShowMovies";

function App() {
  return (
    <div className="bg-black">
      <Header></Header>
      <Movies></Movies>
      <Series></Series>
      <ShowMovies></ShowMovies>
    </div>
  );
}

export default App;
