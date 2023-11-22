import "./App.css";
import { useEffect } from "react";
import { HomePage, SearchPage } from "./pages/pageIndex";
import { usePodcastPreviewStore } from "./store/storeIndex";
import { usePageStore } from "./store/storeIndex";

function App() {
  const { data, fetchData } = usePodcastPreviewStore();
  const { activePage } = usePageStore();

  useEffect(() => {
    // fetching our Podcast Preview data at the highest level component
    if (data.length === 0) {
      fetchData();
    }
  }, []);
  console.log(data);
  return (
    <>
      {activePage === "home" && <HomePage />}
      {activePage === "search" && <SearchPage />}
    </>
  );
}

export default App;

// {activePage === 'profile' && <HomePage/>}
// {activePage === 'player' && <HomePage/>}
// {activePage === 'login' && <HomePage/>}
