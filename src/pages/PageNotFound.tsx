import { useMoveBack } from "../hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main data-page-not-found="true">
      <div data-error-box="true">
        <h1>
          The page you are looking for could not be found 😢
        </h1>
        <button onClick={moveBack}>
          &larr; Go back
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;
