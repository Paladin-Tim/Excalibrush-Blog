export const ValidationError = (errorText) => {
  return (
    <div className="errorWrapper">
      <span className="errorText">{`Validation error: ${errorText}`}</span>
    </div>
  );
};
