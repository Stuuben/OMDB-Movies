import { Link } from "react-router-dom";
import { Header } from "./Header";

export const ErrorPage = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Header></Header>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <h1 className="text-white text-3xl font-bold text-center p-4">
          Something went wrong...
        </h1>
        <Link to="/">
          <button
            style={{ backgroundColor: "rgb(51, 166, 211)" }}
            className="text-white bg-blue-500 text-2xl  font-bold py-4 px-8 rounded m-4"
          >
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};
