import { Controls, Player } from "@lottiefiles/react-lottie-player";
import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="flex justify-center items-center">
      {/* @ts-ignore */}
      <Player
        autoplay
        loop
        src="https://assets2.lottiefiles.com/packages/lf20_R7lSdw.json"
        style={{ height: "30px", width: "30px" }}
      >
        {/* @ts-ignore */}
        <Controls
          visible={false}
          buttons={["play", "repeat", "frame", "debug"]}
        />
      </Player>
    </div>
  );
};

export default Loading;
