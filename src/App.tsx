import MainPage from "./pages/Main.tsx";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainPage />
      <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
        Created by{" "}
        <a href="https://github.com/MolokovNikita" className="underline">
          https://github.com/MolokovNikita
        </a>
      </footer>
    </div>
  );
};

export default App;
