# react-advanced

* davidjj76
* https://github.com/davidjj76
* https://discord.com/channels/1112689497642115172/1112689499605049377

Partimos de los fundamentales de React:

* https://github.com/alexjust-data/FullStack11_0React_fundamentals


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



# compartir lógica entre entre componentes

Vamos a ver unas mecánicas, unas técnicas para poder compartir lógica entre entre componentes.Hay veces que nosotros empezamos a codificar un componente que hace determinadas cosas y al rato estamos codificando un nuevo componente que hace cosas muy similares.Entonces ahí ya empezamos a notar que probablemente estemos repitiendo código, que los 2 componentes tienen código muy similar, cambian algunas cosas.Cambian cómo pintan la información a lo mejor, pero Pero la lógica de los 2 componentes es bastante repetida.Entonces, ¿cómo podemos sacar esa esa lógica? A determinadas entidades que pueden ser funciones, componentes, etcétera, para ponerla en común y que luego sea fácil de reutilizar y crear componentes que que que manejen esa lógica

```sh
npm create vite@latest

    Need to install the following packages:
    create-vite@5.1.0
    Ok to proceed? (y) y
    ✔ Project name: … react_advanced
    ✔ Select a framework: › React
    ✔ Select a variant: › JavaScript

    Scaffolding project in /Users/alex/Desktop/KEEPKODING/REACT_AVANZADO/GIT/FullStack14_react-advenced/react_advanced...

    Done. Now run:

        cd react_advanced
        npm install
        npm run dev


cd react_advanced 
npm install

    added 271 packages, and audited 272 packages in 16s

    97 packages are looking for funding
    run `npm fund` for details

    found 0 vulnerabilities

npm run dev

  VITE v5.0.11  ready in 736 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Hago limpieza de archivos creados por Vite, elimino `App.css` me quedo solo con el index.css

```js
//  me quedo con esto
function App() 
  return (
    <>
    </>
  )

export default App
```

Partimos de esta api free y abierta para hacer pruebas de conceptos: https://www.balldontlie.io/home.html#players

tiene dos ENDPOINTS
* GET https://www.balldontlie.io/api/v1/players
* GET https://www.balldontlie.io/api/v1/teams

Creo componente para pintar los equipos por pantalla `Teams.jsx`

```js
export default function Teams() {

  return (
    <div>
      <h2>Teams</h2>
    </div>
  );
}
```

```js
//  me quedo con esto
import Teams from './Teams';

function App(){
  return (
    <>
        <Teams />
    </>
  );
}

export default App
```

Quiero que este `<h2>Teams</>` genere un listado de equipos en el Browser
* `GET https://www.balldontlie.io/api/v1/teams` que los descargue y haga un page
* Ponerlos en estado local
* pintarlos

Cuando yo quiero o voy a tener datos en un componente que pueden cambiar a lo largo del tiempo, pues lo que hacía era definirme un Estado. Vamos a llamar Teams, con su función asociada para modificar ese estado. Esto lo hacíamos con `UseState`

```js
import { useState } from 'react';


export default function Teams({ color }) {
    const [teams, setTeams] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

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
}
```

¿como se hace para que nuestro componente se sincronice con nuesto api externo paea traerse los datos? con un efecto

```js
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
```

Si te vas al Browser ya pinta. 

> [!NOTE]
> Ahora llega el compañero de producción y dice que quiere un componente similar para mostrar el listado de jugadores que tiene este endpoint : GET https://www.balldontlie.io/api/v1/players. Entonces de entrada nos plantearíamos hacer un componente para jugadores y copiar más o menos el codigo


Creo `Players.jsx`

```js
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
```

App

```js
//  me quedo con esto
import Teams from './Teams';
import Players from './Players';

function App(){
  return (
    <>
        <Teams />
        <Players />
    </>
  );
}

export default App
```

Fíjate que hacen cosas diferentes Pero su lógica de funcionamiento interna, si las ponemos una frente a otro, son muy parecidas. De hecho, he creado 1 he hecho un copyright y me crea el siguiente, y he tenido que que adaptar algunas cosas de acuerdo, bueno, pues sería interesante si podemos extraer lo que tienen en común: estos 2 componentes y poderlo utilizarlo y luego crear ser con ello capaces de crear un componenteTeams que utiliza esa abstracción para pintar los equipos y un componente players que utiliza esa abstracción para crear los equipos.Tenemos varias técnicas, como he dicho al principio, vamos a poder, por ejemplo, hacer Hyer del Components. Vamos a hacer.Vamos a poder hacer render Probs. Vamos a poder hacer custo hooks. 

* ¿cómo vamos a extraer aun componente toda la lógica del `fetch` (conectarse a datos, traer, manejar el estado)?
* ¿qué es lo que es particular a cada caso ? pues esto

```js
        <ul>
            {teams.map(team => (
                <li key={team.id}>{team.full_name}</li>
            ))}
        </ul>
```
es particular de casa caso el ¿qué hago con los datos y el estado de cada caso que me devuelve fetch? pues lo pinto, pero si me devuelve un objeto podría hacer algo más.

## Tecnica 1 : renderProst

Esta técnica es pasar una funcion como props(atributo) que sirve para renderizarlo.

Sacaremos lo comun y delegamos la parte de pintar lo delegamos a los componentes.  
Me creo componente `Fetch.js` nos interesa lo que va a ser comun, me copio y pego `Teams` por ejemplo


```js
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
```

Y ahora vamos a sustituir en `Teams` todo lo que ahora ya tengo aquí y me quedaría así:

```js
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
```

`Players`

```js
import Fetch from './Fetch';

export default function Players() {
  return (
    <div>
      <h2>Players</h2>
      <Fetch
        initialData={[]}
        url= "https://www.balldontlie.io/api/v1/players"
        renderData={data => {
          return (
            <ul>
              {data.map(player => (
                <li key={player.id}
                >{`${player.first_name} ${player.last_name}`}</li>
              ))}
            </ul>
          );
        }}
      />
    </div>
  );
}
```



