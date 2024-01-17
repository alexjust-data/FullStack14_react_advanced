import { useEffect, useState } from 'react';


export default function Teams() {
    const [teams, setTeams] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsFetching(true);
        setError(null);

        fecth('https://www.balldontlie.io/api/v1/teams')
            .then(response => {
                if(!response.ok){ throw new Error('Oooops')}
                return response.json();
            })
            .then(result => setTeams(result.data))
            .catch(error => setError(error))
            .finally(() => {
                setIsFetching(false);
            });
    }, []);


  return (
    <div>
      <h2>Teams</h2>
      {isFetching && <div>Loading...</div>}
      {error && <div>Ooops, there was an error</div>}
      {(!isFetching && !error) && (
        <ul>
            {teams.map(team => (
                <li key={team.id}>{team.full_name}</li>
            ))}
        </ul>
      )}
    </div>
  );
};
