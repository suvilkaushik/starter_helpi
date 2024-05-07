import { useEffect, useState } from "react";
import "../../App.css";

function Results({
  returnValue,
  setReturnValue,
}: {
  returnValue: any;
  setReturnValue: any;
}) {
  let jsonData = JSON.parse(returnValue);
  const [careerData, setCareerData] = useState<{
    [key: string]: string;
  } | null>(null);
  useEffect(() => {
    const parsedData = JSON.parse(jsonData);
    setCareerData(parsedData);
  }, [jsonData]);

  return (
    <div className="questionContainer">
      {careerData && (
        <>
          <h2>Field: {careerData.Field}</h2>
          <p>
            Possible Job Titles:{" "}
            {Array.isArray(careerData.potential_job_titles)
              ? careerData.potential_job_titles.join(", ")
              : ""}
          </p>
          <p>{careerData.reasoning}</p>
        </>
      )}
    </div>
  );
}

export default Results;
