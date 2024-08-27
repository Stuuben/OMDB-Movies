import { useEffect } from "react";

//@ts-expect-error ???
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { ImdbInterface } from "../models/ImbdInterface";
import { Link } from "react-router-dom";

const apiKey = import.meta.env.VITE_API_KEY;

const seriesImdbIds = [
  "tt0903747", // Breaking Bad
  "tt0944947", // Game of Thrones
  "tt2861424", // Rick and Morty
  "tt11126994", // Arcane
  "tt0108778", // Friends
  "tt0182576", // Family Guy
  "tt6470478", // Good Doctor
  "tt1190634", // The Boys
];

const fetchSeriesData = async (apiKey: string, seriesImdbIds: string[]) => {
  const seriesPromises = seriesImdbIds.map((id: string) =>
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

export const SerieSlider = () => {
  useEffect(() => {
    const getSeries = async () => {
      setLoading(true);
      try {
        const seriesData = await fetchSeriesData(apiKey, seriesImdbIds);
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
            <div key={index} className="p-2 cursor-pointer">
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
      <div className="border-t-2 p-2 text-4xl text-left bg-gray-800">
        Series
      </div>

      <div>
        <SimpleSlider></SimpleSlider>
      </div>
    </>
  );
};
