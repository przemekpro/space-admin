import './app.scss'
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';


function App() {
  return (
    <div className="app">
      <aside className="app-sidebar">
        <Sidebar />
      </aside>
      <div className="app-wrapper">
        <Navbar />
      </div>
    </div>
  );
}

export default App;
