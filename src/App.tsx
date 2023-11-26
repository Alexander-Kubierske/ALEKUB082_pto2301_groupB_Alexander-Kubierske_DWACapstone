import "./App.css";
import { useEffect } from "react";
import AppRouter from "./Router/AppRouter";
import { usePodcastPreviewStore } from "./store/1storeIndex";

function App() {
  const { data, fetchData } = usePodcastPreviewStore();

  useEffect(() => {
    // fetching our Podcast Preview data at the highest level component
    if (data.length === 0) {
      fetchData();
    }
  }, []);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
