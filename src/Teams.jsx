import useFetch from '../../../react-advanced/src/useFetch';
import List from './List';

export default function Teams({ color }) {
  const { data: teams, isFetching, error } = useFetch({
    initialData: [],
    url: 'https://www.balldontlie.io/api/v1/teams'
  })
  return (
    <div style={ {color} }>
      <h2>Teams</h2>
      <List 
        data={teams} 
        renderItem={team => team.full_name}
        getKey={item => item.id} 
      />
    </div>
  );
}
