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

const TeamsWithFetch = withFetch({
  initialData: [],
  url: 'https://www.balldontlie.io/api/v1/teams',
})(Teams);

export default TeamsWithFetch;