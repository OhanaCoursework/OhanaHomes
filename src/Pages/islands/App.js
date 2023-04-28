import React from "react";
import {useParams} from 'react-router-dom';
import IslandsPage from "./components/islandsPage.js";
import Navbar from "../../generalComponents/navbar/Navbar.js";
import Footer from "../../generalComponents/footer/Footer.js";
import { IslandsData } from "../../data/islandsData/islandsData.js";

function IslandsApp() {
  const island = IslandsData.find((island) => island.island.value === useParams().island);
  
  return (
    <>
      <Navbar />
      <IslandsPage islandData = {island} />
      <Footer />
    </>
  );
}

export default IslandsApp;
