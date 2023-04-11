import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  const features = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'VideoPosterCropper',
      path: 'videopostercropper',
    },
    {
      title: 'VideoPosterCatcher',
      path: 'videopostercacher',
    },
  ];
  return (
    <div>
      <header className="fixed left-0 right-0 top-0 flex h-16 items-center justify-center bg-emerald-100">
        {features.map(item => (
          <div key={item.path} className="p-2">
            <a href={item.path}>{item.title}</a>
          </div>
        ))}
      </header>
      <div className="pb-16 pt-16">
        <Outlet></Outlet>
      </div>
      <footer className="fixed bottom-0 left-0 right-0 flex h-16 items-center justify-center bg-slate-500">
        <span>Power by rosendo</span>
      </footer>
    </div>
  );
}

export default App;
