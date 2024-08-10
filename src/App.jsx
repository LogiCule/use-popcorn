import { ListBox, Navbar, WatchedBox } from "./components";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="main">
        <ListBox />
        <WatchedBox />
      </main>
    </>
  );
}
