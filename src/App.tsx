import './App.css'
import { useEffect } from "react";
import { Navbar, MediumCard, Carousel } from './components/componentIndex';
import { HomePage } from './pages/pageIndex';
import { usePodcastPreviewStore } from './store/storeIndex';


function App() {
  const { data, fetchData } = usePodcastPreviewStore();

  useEffect(() => { // fetching our Podcast Preview data at the highest level component
    if (data.length === 0) {
      fetchData();
    }
  }, []);

  const cardElements = data.map((podcast) => (
    <MediumCard key={podcast.id} {...podcast} />
  ));

  console.log(data)
  return (
    <>
      <Navbar/>
      <HomePage/>
    </>
    
  )
}

export default App