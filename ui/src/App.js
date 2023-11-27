import './App.css';
import ButtonWithIcon from './components/ButtonWithIcon'
import CapacityDisplay from './components/CapacityDisplay';

function App() {
  return (
    <div className="App">
      <div className='buttonContainer'>
        <ButtonWithIcon buttonText="Take Off"/>
        <ButtonWithIcon buttonText="Land"/>
        <ButtonWithIcon buttonText="Return to Home"/>
      </div>
      <div className='capacitiesContainer'>
        <CapacityDisplay type="Battery" capacity="50"/>
        <CapacityDisplay type="Tank" capacity="80"/>
      </div>
    </div>
  );
}

export default App;
