import './App.css';
import ComicStrip from './ComicStrip';
import { Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path="/:id" render={(props) => {
        if (props.match.params.id === 1) return (<Redirect to="/" />)
        else return (<ComicStrip />)
      }
      }
      />
      <Route exact path="/">
        <ComicStrip />
      </Route>
    </div>
  );
}

export default App;
