import { useEffect, useState, memo } from "react";
import { Howl } from "howler";

const Song = ({ track }) => {
  const [audio] = useState(
    new Howl({
      src: [track],
      autoplay: false,
      loop: true,
      volume: 1,
      onfade: () => {
        audio.stop();
      }
    })
  );
  const [audioId, setAudioId] = useState();

  useEffect(() => {
    setAudioId(audio.play());

    // fade out on chapter exit, over 3/4 second
    return () => {
      audio.fade(1, 0, 750, audioId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default memo(Song);
