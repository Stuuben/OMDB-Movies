import { useEffect } from "react";

//@ts-expect-error ???
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { ImdbInterface } from "../models/ImbdInterface";
import { Link } from "react-router-dom";

export const Series = () => {
  const breakingBad = "tt0903747";
  const gameOfThrones = "tt0944947";
  const rickAndMorty = "tt2861424";
  const arcane = "tt11126994";
  const friends = "tt0108778";
  const familyGuy = "tt0182576";
  const goodDoctor = "tt6470478";
  const theBoys = "tt1190634";

  const [imdbSeries, setImdbSeries] = useState<ImdbInterface[]>([]);
  const [loading, setLoading] = useState(false);

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

    console.log("imdbSeries", imdbSeries);

    return (
      <Slider {...settings}>
        {imdbSeries.map((series, index) => (
          <Link key={index} state={{ series }} to={`/${series.imdbID}`}>
            <div key={index} className="p-2 cursor-pointer">
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

  const getSeries = async () => {
    try {
      const seriesPromise = [
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${breakingBad}`),
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${gameOfThrones}`),
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${rickAndMorty}`),
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${arcane}`),
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${friends}`),
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${theBoys}`),
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${familyGuy}`),
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${goodDoctor}`),
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
    getSeries();
  }, []);

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
