import React from "react";
import {useParams} from 'react-router-dom';
import IslandsPage from "./components/IslandsPage.js";
import Navbar from "../../generalComponents/navbar/Navbar";
import Footer from "../../generalComponents/footer/Footer";
import { IslandsData } from "../../helpers/islandsData/islandsData.js";

function IslandsApp() {
  const island = IslandsData.find((island) => island.island.toLowerCase() === useParams().island);
  
  return (
    <>
      <Navbar />
      <IslandsPage islandData = {island} />
      <Footer />
    </>
  );
}

export default IslandsApp;
