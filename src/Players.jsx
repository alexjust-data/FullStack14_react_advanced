import { useEffect, useState } from 'react';


export default function Players() {
    const [players, setTeams] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsFetching(true);
        setError(null);

        fecth('https://www.balldontlie.io/api/v1/players')
            .then(response => {
                if(!response.ok){ throw new Error('Oooops')}
                return response.json();
            })
            .then(result => setPlayers(result.data))
            .catch(error => setError(error))
            .finally(() => {
                setIsFetching(false);
            });
    }, []);


  return (
    <div>
      <h2>Players</h2>
      {isFetching && <div>Loading...</div>}
      {error && <div>Ooops, there was an error</div>}
      {(!isFetching && !error) && (
        <ul>
            {players.map(player => (
                <li 
                  key={player.id}
                >{`${player.firts_name} ${player.last_name} `}</li>
            ))}
        </ul>
      )}
    </div>
  );
};

