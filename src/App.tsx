import "./App.css";
import supabase from "./services/supaBaseConnector";
import { useEffect } from "react";
import AppRouter from "./Router/AppRouter";
import {
  usePodcastPreviewStore,
  useUserStore,
  usePlayerStore,
} from "./store/1storeIndex";

function App() {
  const { data, fetchData } = usePodcastPreviewStore();
  const { user, userData, setUser, setUserData } = useUserStore();
  const { isPlaying, currentEpisode } = usePlayerStore();

  useEffect(() => {
    // fetching our Podcast Preview data at the highest level component
    if (data.length === 0) {
      fetchData();
    }
  }, []);

  // <=========== Get user data from storage if we reload ===========>

  useEffect(() => {
    // Check if it's a page reload using PerformanceNavigationTiming
    if (window.performance && window.performance.getEntriesByType) {
      const navigationEntries = window.performance.getEntriesByType(
        "navigation"
      ) as PerformanceNavigationTiming[];
      if (
        navigationEntries.length > 0 &&
        navigationEntries[0].type === "reload"
      ) {
        setUser(sessionStorage.getItem("user")!);
        setUserData(JSON.parse(sessionStorage.getItem("userData")!));
      }
    }
  }, []);

  // <=========== Get user data on Login/Signup ===========>

  useEffect(() => {
    const getUserData = async () => {
      if (user !== "" && user !== "check" && userData === "") {
        const { data } = await supabase
          .from("userData")
          .select()
          .eq("user_id", user);

        sessionStorage.setItem("user", user!);
        sessionStorage.setItem("userData", JSON.stringify(data));
        const storedUserData = sessionStorage.getItem("userData");
        setUserData(JSON.parse(storedUserData!));
      }
    };
    getUserData();
  }, [user]);

  // <=========== Warn user on leaving app ===========>

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isPlaying) {
        const message =
          "A podcast is currently playing.\nAre you sure you want to leave?";
        event.returnValue = message;
        sessionStorage.setItem("lastEpisode", JSON.stringify(currentEpisode));
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isPlaying]);

  // <=========== Update Supabase hook ===========>
  //  currently not working as my data structure is too complicated to stringify from what I can tell.

  // useEffect(() => {
  //   const updateSupabaseData = async () => {
  //     try {
  //       if (prevUserData !== userData) {
  //         const newUserData = JSON.stringify(userData[0].favorite_eps);
  //         console.log(
  //           "Updating Supabase data...\n old data:\n",
  //           prevUserData,
  //           "\n\nnewdata:\n",
  //           newUserData
  //         );

  //         const { error } = await supabase
  //           .from("userData")
  //           .update({ favorite_eps: newUserData })
  //           .eq("user_id", user);

  //         if (error) {
  //           throw new Error(`Update failed: ${error.message}`);
  //         }

  //         console.log("Supabase data updated successfully");
  //       } else {
  //         console.log("userData is the same, no need to update");
  //       }
  //     } catch (error) {
  //       console.error("Error updating Supabase data:", error.message);
  //     }
  //   };

  //   updateSupabaseData();
  // }, [userData]);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
