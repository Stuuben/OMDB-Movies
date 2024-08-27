import { Movies } from "./Movies";
import { SerieSlider } from "./SerieSlider";
import { MovieSlider } from "./MovieSlider";

export const Home = () => {
  return (
    <div className="bg-black">
      <Movies />
      <SerieSlider />
      <MovieSlider />
    </div>
  );
};
