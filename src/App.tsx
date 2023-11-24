import "./App.css";
import { useEffect } from "react";
import { HomePage, SearchPage, LoginPage } from "./pages/1pageIndex";
import { usePodcastPreviewStore, usePageStore } from "./store/1storeIndex";

function App() {
  const { data, fetchData } = usePodcastPreviewStore();
  const { activePage } = usePageStore();

  useEffect(() => {
    // fetching our Podcast Preview data at the highest level component
    if (data.length === 0) {
      fetchData();
    }
  }, []);

  return (
    <>
      <LoginPage />
    </>
  );
}

export default App;

// {activePage === "home" && <HomePage />}
// {activePage === "search" && <SearchPage />}
// {activePage === 'profile' && <HomePage/>}
// {activePage === 'player' && <HomePage/>}
// {activePage === 'login' && <HomePage/>}
