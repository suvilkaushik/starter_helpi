import { useEffect, useState } from "react";
import "../../App.css";

function Results({
  returnValue,
  setReturnValue,
}: {
  returnValue: string;
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
      {" "}
      {careerData && (
        <>
          <h2>{careerData.Field}</h2>
          <p>{careerData.potential_job_titles}</p>
          <p>{careerData.reasoning}</p>
        </>
      )}
    </div>
  );
}

export default Results;
