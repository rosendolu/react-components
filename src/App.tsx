import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <header>header</header>
      <Outlet></Outlet>
      <footer>footer</footer>
    </div>
  );
}

export default App;
