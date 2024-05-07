import { useEffect, useState } from 'react';
import { generateImage } from '../../gpt';

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
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const parsedData = JSON.parse(jsonData);
    setCareerData(parsedData);
  }, [jsonData]);

  useEffect(() => {
    const fetchImage = async () => {
      const url = await generateImage("Generate me an image of a software engineer career path");
      setImageUrl(url);
    };

    fetchImage();
  }, []);

  return (
    <div className="questionContainer">
      {" "}
      {careerData && (
        <>
          <h2>{careerData.Field}</h2>
          <p>{careerData.potential_job_titles}</p>
          <p>{careerData.reasoning}</p>
          {imageUrl && <img src={imageUrl} alt="Career Path" />}
        </>
      )}
    </div>
  );
}

export default Results;