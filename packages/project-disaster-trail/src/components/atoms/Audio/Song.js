import { useEffect, useState, memo } from "react";
import { Howl } from "howler";

const Song = ({ songFile, volume = 0.5 }) => {
  const [audio] = useState(
    new Howl({
      src: [songFile],
      autoplay: false,
      loop: true,
      volume,
      onfade: () => {
        audio.stop();
      }
    })
  );
  const [audioId, setAudioId] = useState();

  useEffect(() => {
    // when the component renders, play the audio file
    // and store a reference to it so we can discreetly control it
    setAudioId(audio.play());

    // fade out on chapter exit, over 3/4 second
    return () => {
      audio.fade(volume, 0, 750, audioId);
    };
    // it's necessary to only useEffect onLoad, so no dependencies should exist
    // otherwise the audio fades out when the audioId state value changes :(
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default memo(Song);
