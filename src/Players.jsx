import withFetch from './withFetch';
import List from './List';


function Players({ data: players }) {
  return (
    <div>
      <h2>Players</h2>
      <List 
        data={players} 
        renderItem={player => player.first_name + ' ' + player.last_name}
        getKey={player => player.id} 
        listComponent='ol'
      />
    </div>
  );
}

const withFetchConfig = withFetch({
  initialData: [],
  url: 'https://www.balldontlie.io/api/v1/players',
});

const PlayersWithFetch = withFetchConfig(Players)

export default PlayersWithFetch;
