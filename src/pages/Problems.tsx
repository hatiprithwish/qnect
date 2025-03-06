import { Link } from "react-router-dom";
import { problemStatements } from "../constants";

const Problems = () => {
  return (
    <section className="text-center">
      <h1 className="text-4xl font-bold my-10">Design Problems</h1>
      <div className="list-decimal list-inside flex flex-wrap gap-4 justify-center items-stretch">
        {problemStatements.map((problem, index) => (
          <Link
            to={`/flow?problemStatement=${problem
              .split(" ")
              .join("-")
              .toLowerCase()}`}
            key={index}
            className="p-4 bg-blue-950 rounded-lg w-52 flex flex-col justify-center cursor-pointer hover:bg-blue-900"
          >
            {problem}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Problems;
