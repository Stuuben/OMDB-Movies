import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="flex justify-center p-2 bg-black">
      <Link to="/">
        <img src="./pixels.png" alt="" width={300} />
      </Link>
    </div>
  );
};
