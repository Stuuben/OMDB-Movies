import { useEffect } from "react";

//@ts-expect-error ???
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { ImdbInterface } from "../models/ImbdInterface";
import { Link } from "react-router-dom";

const apiKey = import.meta.env.VITE_API_KEY;

const moviesArray = [
  "tt0167260", // Lord of the Rings: The Fellowship of the Ring
  "tt1375666", // Inception
  "tt0133093", // The Matrix
  "tt0816692", // Interstellar
  "tt0120815", // Saving Private Ryan
  "tt0088763", // Back to the Future
  "tt0172495", // Gladiator
];

const fetchSeriesData = async (apiKey: string, moviesArray: string[]) => {
  const seriesPromises = moviesArray.map((id: string) =>
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
  );

  try {
    const responses = await Promise.all(seriesPromises);
    const seriesData = await Promise.all(
      responses.map((response: { json: () => Promise<ImdbInterface> }) =>
        response.json()
      )
    );
    return seriesData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const MovieSlider = () => {
  useEffect(() => {
    const getSeries = async () => {
      setLoading(true);
      try {
        const seriesData = await fetchSeriesData(apiKey, moviesArray);
        setImdbSeries(seriesData);
      } catch (error) {
        console.error("Failed to fetch series data:", error);
      } finally {
        setLoading(false);
      }
    };

    getSeries();
  }, []);

  const [imdbSeries, setImdbSeries] = useState<ImdbInterface[]>([]);
  const [loading, setLoading] = useState(false);

  const SimpleSlider = () => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: true,
    };

    console.log("imdbSeries", imdbSeries);

    return (
      <Slider {...settings}>
        {imdbSeries.map((series, index) => (
          <Link key={index} state={{ series }} to={`/${series.imdbID}`}>
            <div key={index} className="p-2 cursor-pointer mb-10">
              <h3 className="text-xl text-ellipsis overflow-hidden whitespace-nowrap max-w-xs">
                {series.Title}
              </h3>
              <div>
                <img
                  src={series.Poster}
                  alt=""
                  style={{ width: "300px", height: "370px" }}
                />
              </div>

              <p>{series.Year}</p>
              <p>{series.Ratings[0].Value}</p>
            </div>
          </Link>
        ))}
      </Slider>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="border-t-2 p-2 mt-10 text-4xl text-left bg-gray-800">
        Movies
      </div>

      <div>
        <SimpleSlider></SimpleSlider>
      </div>
    </>
  );
};
