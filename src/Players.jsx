import withFetch from './withFetch';


function Players({ data: players }) {
  return (
    <div>
      <h2>Players</h2>
      <ul>
        {players.map(player => (
          <li key={player.id}>{`${player.first_name} ${player.last_name}`}</li>
        ))}
      </ul>
    </div>
  );
}

// llamo a withFetch pasándole el componete Teams y dos opciones
const PlayerswithFetch = withFetch(Players, {
  initialData: [], 
  url: "https://www.balldontlie.io/api/v1/players"
});


export default PlayerswithFetch;
