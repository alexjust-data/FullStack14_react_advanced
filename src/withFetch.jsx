import { useEffect, useState } from 'react';

export default function withFetch({ initialData, url }) {
  return function (WrappedComponent) {
    function WithFetchComponent(props) {
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
      }, []);

      if (isFetching) {
        return <div>Loading...</div>;
      }
      if (error) {
        return <div>Ooops, there was an error!!!</div>;
      }

      return <WrappedComponent data={data} {...props} />;
    }
    return WithFetchComponent;
  };
}