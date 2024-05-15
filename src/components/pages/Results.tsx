import { useEffect, useState } from 'react';
import { generateImage } from '../../gpt';

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
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const parsedData = JSON.parse(jsonData);
    setCareerData(parsedData);
  }, [jsonData]);

  useEffect(() => {
    const fetchImage = async () => {
      console.log(careerData);
      if (careerData) {
        
        const url = await generateImage(careerData.Field);
        setImageUrl(url);
      }
    };

    fetchImage();
  }, [careerData]);

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
          {imageUrl && <img src={imageUrl} alt="Career Path" />}
        </>
      )}
    </div>
  );
}

export default Results;