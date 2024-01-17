import Fetch from './Fetch';

export default function Teams() {
  return (
    <div>
      <h2>Teams</h2>
      <Fetch
        initialData={[]}
        url= "https://www.balldontlie.io/api/v1/teams"
        renderData={data => {
          return (
            <ul>
              {data.map(team => (
                <li key={team.id}
                >{team.full_name}</li>
              ))}
            </ul>
          );
        }}
      />
    </div>
  );
}
