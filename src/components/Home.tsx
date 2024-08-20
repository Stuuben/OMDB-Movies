import { Movies } from "./Movies";
import { Series } from "./Series";
import { ShowMovies } from "./ShowMovies";

export const Home = () => {
  return (
    <div className="bg-black">
      <Movies></Movies>
      <Series></Series>
      <ShowMovies></ShowMovies>
    </div>
  );
};
