import './App.css';
import { connect } from 'react-redux';
import Ecoliers from './containers/Ecoliers/Ecoliers';
import CreateEcolier from './containers/CreateEcolier/CreateEcolier';
import { CreateProvider } from './containers/CreateEcolier/CreateContext';

function App(props) {

  return (
    <div className="App">
      <div className="main">
        <CreateProvider>
          <h2 className={'headline'}>Liste de nos élèves</h2>
          <CreateEcolier />
          <Ecoliers eleves={props.eleves} />
        </CreateProvider>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    eleves: state.elevesReducer.eleves
  }
}

export default connect(mapStateToProps)(App);
