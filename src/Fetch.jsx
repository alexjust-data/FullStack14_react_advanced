import { useEffect, useState } from 'react';


// le paso los props/atributos para que sea más generico
export default function Fetch({initialData, url, renderData}) {
  const [data, setData] = useState(initialData);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsFetching(true);
    setError(null);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Oooops');
        }
        return response.json();
      })
      .then(result => setData(result.data))
      .catch(error => setError(error))
      .finally(() => {
        setIsFetching(false);
      });
  }, [url]);

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Ooops, there was an error!!!</div>;
  }

  return renderData(data);
}