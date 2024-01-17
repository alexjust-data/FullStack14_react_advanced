import withFetch from './withFetch';

function Teams({ data: teams, color }) {
  return (
    <div style={ {color} }>
      <h2>Teams</h2>
        <ul>
          {teams.map(team => (
            <li key={team.id}
            >{team.full_name}</li>
          ))}
        </ul>
    </div>
  );
}

// llamo a withFetch pasándole el componete Teams y dos opciones
const TeamswithFetch = withFetch(Teams, {
  initialData: [], 
  url: "https://www.balldontlie.io/api/v1/teams"
});

export default TeamswithFetch;