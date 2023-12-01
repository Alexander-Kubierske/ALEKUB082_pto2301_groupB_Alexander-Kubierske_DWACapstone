import { useEffect, useRef } from "react";
import { AppBar } from "@mui/material";
import { usePlayerStore } from "../store/playerStore";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const PlayerBar = () => {
  const { currentEpisode, isPlaying, playEpisode, pauseEpisode } =
    usePlayerStore();
  const audioPlayerRef = useRef<H5AudioPlayer>(null);

  const controlPlayPause = () => {
    if (isPlaying) {
      pauseEpisode();
    } else {
      playEpisode(currentEpisode!);
    }
  };

  useEffect(() => {
    const audioPlayer = audioPlayerRef.current;

    // Ensure that audioPlayer is not null before proceeding
    if (audioPlayer) {
      const playButton = audioPlayer.audio.current?.querySelector(
        ".rhap_play-pause-button"
      );

      if (playButton) {
        playButton.addEventListener("click", controlPlayPause);
      }

      return () => {
        if (playButton) {
          playButton.removeEventListener("click", controlPlayPause);
        }
      };
    }

    return undefined;
  }, [isPlaying]);

  useEffect(() => {
    const audioPlayer = audioPlayerRef.current;

    if (audioPlayer && audioPlayer.audio.current instanceof HTMLAudioElement) {
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
