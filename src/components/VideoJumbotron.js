import React from "react";
import ReactPlayer from "react-player";

export const VideoJumbotron = ({ url, onEnded }) => {
  return <ReactPlayer url={url} key={url} playing controls onEnded={onEnded} />;
};
