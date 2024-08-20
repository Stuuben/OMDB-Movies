import { useEffect } from "react";
//@ts-expect-error ???
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { ImdbInterface } from "../models/ImbdInterface";
import { Link } from "react-router-dom";

export const ShowMovies = () => {
  const lotr = "tt0167260";
  const inception = "tt1375666";
  const matrix = "tt0133093";
  const interstellar = "tt0816692";
  const savingPrivateRyan = "tt0120815";
  const backToTheFuture = "tt0088763";
  const gladiator = "tt0172495";

  const [imdbSeries, setImdbSeries] = useState<ImdbInterface[]>([]);
  const [loading, setLoading] = useState(false);
  console.log("imdbSeries", imdbSeries);

  const apiKey = import.meta.env.VITE_API_KEY;
  const SimpleSlider = () => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: true,
    };

    return (
      <Slider {...settings}>
        {imdbSeries.map((series, index) => (
          <Link key={index} state={{ series }} to={`/${series.imdbID}`}>
            <div key={index} className="p-2">
              <h3 className="text-xl">{series.Title}</h3>
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

  const getMovies = async () => {
    try {
      const seriesPromise = [
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${lotr}`),
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${inception}`),
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${matrix}`),
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${interstellar}`),
        fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${savingPrivateRyan}`
        ),
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${backToTheFuture}`),
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${gladiator}`),
      ];

      const responses = await Promise.all(seriesPromise);
      const seriesData = await Promise.all(
        responses.map((response) => response.json())
      );

      console.log(seriesData);
      setImdbSeries(seriesData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="pt-20">
      <div className="border-t-2 p-2 text-4xl text-left bg-gray-800">
        Movies
      </div>

      <div>
        <SimpleSlider></SimpleSlider>
      </div>
    </div>
  );
};
