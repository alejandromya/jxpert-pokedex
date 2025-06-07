import useLogger from "./useLogger";

function pruebaHookLogger() {
  useLogger("Hola desde App");

  return (
    <div>
      <h1>Hola mundo</h1>
    </div>
  );
}

export default pruebaHookLogger;
