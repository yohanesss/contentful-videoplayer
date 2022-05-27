import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { getVideoAds } from "./apis/contentful";
import ReactPlayer from "react-player";
import { VideoJumbotron } from "./components/VideoJumbotron";

function App() {
  const [adVideos, setAdVideos] = useState([]);
  const [nowPlayingIdx, setNowPlayingIdx] = useState(0);

  useEffect(() => {
    const _getVideoAds = async () => {
      const videoAds = await getVideoAds();
      console.log("[videoAds]", videoAds);
      const transformedVideoAds = videoAds.fields.videos.map(
        (v) => "https:" + v?.fields?.video?.fields?.file?.url
      );
      setAdVideos(transformedVideoAds);
    };

    _getVideoAds();
  }, []);

  return (
    <div className="App">
      {/* {JSON.stringify(adVideos, null, 2)} */}
      {adVideos && (
        <VideoJumbotron
          url={adVideos[nowPlayingIdx]}
          onEnded={() =>
            setNowPlayingIdx(
              nowPlayingIdx < adVideos.length - 1 ? nowPlayingIdx + 1 : 0
            )
          }
        />
      )}
    </div>
  );
}

export default App;
