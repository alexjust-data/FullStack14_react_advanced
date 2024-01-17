import useFetch from '../../../react-advanced/src/useFetch';


export default function Teams({ color }) {
  const { data: teams, isFetching, error } = useFetch({
    initialData: [],
    url: 'https://www.balldontlie.io/api/v1/teams'
  })
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
