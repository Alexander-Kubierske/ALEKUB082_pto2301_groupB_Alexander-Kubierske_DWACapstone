import { useEffect, useRef } from "react";
import { AppBar } from "@mui/material";
import { usePlayerStore } from "../store/playerStore";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const PlayerBar = () => {
  const {
    currentEpisode,
    isPlaying,
    playEpisode,
    pauseEpisode,
    setCurrentTime,
  } = usePlayerStore();
  const audioPlayerRef = useRef(null);

  const controlPlayPause = () => {
    if (isPlaying) {
      pauseEpisode();
    } else {
      playEpisode(currentEpisode);
    }
  };

  useEffect(() => {
    // Access the play button and attach the custom click event
    const playButton = audioPlayerRef.current.audio.current.querySelector(
      ".rhap_play-pause-button"
    );
    if (playButton) {
      playButton.addEventListener("click", controlPlayPause);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (playButton) {
        playButton.removeEventListener("click", controlPlayPause);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    // Access the AudioPlayer component and control playback based on isPlaying state
    const audioPlayer = audioPlayerRef.current;
    if (audioPlayer) {
      if (isPlaying) {
        audioPlayer.audio.current.play();
      } else {
        audioPlayer.audio.current.pause();
      }
    }
  }, [isPlaying, currentEpisode, playEpisode, pauseEpisode]);

  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <AudioPlayer
        ref={audioPlayerRef}
        src={currentEpisode?.file}
        autoPlay={isPlaying}
        customControlsSection={[
          <h3 style={{ color: "#868686" }}>{currentEpisode?.title}</h3>,
          RHAP_UI.MAIN_CONTROLS,
        ]}
      />
    </AppBar>
  );
};

export default PlayerBar;
