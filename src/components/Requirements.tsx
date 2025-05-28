import { useSearchParams } from "react-router-dom";
import { problemStatements } from "../constants/index";

const Requirements = () => {
  const [searchParams] = useSearchParams();
  const problemStatement = searchParams
    .get("problemStatement")
    ?.split("-")
    .join(" ");
  console.log(problemStatement);
  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold">Requirements: </h3>
      <ul className="list-disc list-outside mt-2">
        {problemStatement &&
          problemStatements
            .find((problem) => problem.title.toLowerCase() === problemStatement)
            ?.requirements?.map((requirement, index) => (
              <li key={index} className="text-sm text-gray-300">
                {requirement}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Requirements;
