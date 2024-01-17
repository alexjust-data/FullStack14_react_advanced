import Fetch from './Fetch';

export default function Players() {
  return (
    <div>
      <h2>Players</h2>
      <Fetch
        initialData={[]}
        url= "https://www.balldontlie.io/api/v1/players"
        renderData={data => {
          return (
            <ul>
              {data.map(player => (
                <li key={player.id}
                >{`${player.first_name} ${player.last_name}`}</li>
              ))}
            </ul>
          );
        }}
      />
    </div>
  );
}

