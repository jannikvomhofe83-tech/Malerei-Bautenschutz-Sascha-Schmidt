import React from "react";
import { Geschichte } from "./Geschichte";
import { VideoAbout } from "./VideoAbout";
import { Team } from "./Team";
import { KarriereVorteile } from "./KarriereVorteile";
import { Karriere } from "./Karriere";

export default function Page() {
  return (
    <div>
      <Geschichte />
      <VideoAbout />
      <Team />
      <KarriereVorteile />
      <Karriere />
    </div>
  );
}
