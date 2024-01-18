export default function List({
    data,
    renderItem,
    getKey,
    listComponent = 'ul',
  }) {
    const Component = listComponent;
  
    return (
      <Component>
        {data.map(item => (
          <li key={getKey(item)}>{renderItem(item)}</li>
        ))}
      </Component>
    );
  }