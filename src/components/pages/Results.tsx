import "../../App.css";

function Results({
  returnValue,
  setReturnValue,
}: {
  returnValue: any;
  setReturnValue: any;
}) {
  //   return <></>;
  return (
    <div className="questionContainer">
      <p>{returnValue}</p>
    </div>
  );
}

export default Results;
