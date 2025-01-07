import logo from './logo.svg';

function App() {
  return (
    <div>
      <header className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-3xl text-white">
        <img src={logo} className="h-[40vmin]  hover:animate-ping animate-spin" alt="logo" />
        <p className="animate-pulse hover:text-5xl">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="text-cyan-500"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
