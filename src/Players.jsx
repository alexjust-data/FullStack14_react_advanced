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

const withFetchConfig = withFetch({
  initialData: [],
  url: 'https://www.balldontlie.io/api/v1/players',
});

const PlayersWithFetch = withFetchConfig(Players)

export default PlayersWithFetch;
