import "./App.css";
import supabase from "./services/supaBaseConnector";
import { useEffect } from "react";
import AppRouter from "./Router/AppRouter";
import { usePodcastPreviewStore, useUserStore } from "./store/1storeIndex";

function App() {
  const { data, fetchData } = usePodcastPreviewStore();
  const { user, setUserData } = useUserStore();

  useEffect(() => {
    // fetching our Podcast Preview data at the highest level component
    if (data.length === 0) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      if (user !== "" && user !== "check") {
        const { data } = await supabase
          .from("userData")
          .select()
          .eq("user_id", user);
        console.log(data);
        setUserData(data);
      }
    };
    getUserData();
  }, [user]);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
