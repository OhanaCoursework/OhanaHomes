import React from "react";
import PropertiesGrid from "./propertiesGrid.js";
import "../styles/marketplace.css";
import searchIcon from "../../../assets/images/icons/searchIcon.svg";
import { getSortedCardData } from "../../../helpers/featuredPropetiesData/propertiesData";

const Marketplace = () => {
  // const [housesList, sethousesList] = useState(getSortedCardData());

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setSearchInput(e.target.value);
  // };

  // if (searchInput.length > 0) {
  //   countries.filter((country) => {
  //     return country.name.match(searchInput);
  //   });
  // }

  function onSearchSubmit(e) {
    e.preventDefault(); //to prevent form submission
    search(document.getElementById("marketplaceSearch").value);
  }

  // function search(searchQuery) {
  //   let regMap = searchQuery
  //     .toLowerCase()
  //     .split(" ")
  //     .filter(function (word) {
  //       return word.length;
  //     })
  //     .map(function (word) {
  //       return new RegExp(word, "i");
  //     });

  //     // imgoing to take all related variables from item in list, and compare against terms in search whoop whop
  //   let results = searchIndex
  //     .reduce(function (results, article, index) {
  //       // Setup priority count
  //       let priority = 0;

  //       // Assign priority
  //       for (let reg of regMap) {
  //         if (reg.test(article.title)) {
  //           priority += 100;
  //         }
  //         let occurences = article.content.match(reg);
  //         if (occurences) {
  //           priority += occurences.length;
  //         }
  //       }

  //       // If any matches, push to results
  //       if (priority > 0) {
  //         results.push({
  //           priority: priority,
  //           article: article,
  //         });
  //       }
  //     }, [])
  //     .sort(function (article1, article2) {
  //       return article2.priority - article1.priority;
  //     });
  // }

  useEffect(() => {
    document
      .getElementById("marketplaceSearch")
      .addEventListener("submit", onSearchSubmit);

    return () => {
      document
        .getElementById("marketplaceSearch")
        .removeEventListener("submit", onSearchSubmit);
    };
  });

  return (
    <section>
      <div className="marketplace" color="black">
        <h1 id="PageHeading">Marketplace Page</h1>
        <div className="searchDiv">
          <input
            type="text"
            placeholder="Enter an address, region, island, or ZIP code"
            className="marketplaceSearch"
            id="marketplaceSearch"
          />
          <img className="searchIcon" src={searchIcon} />
        </div>
        <PropertiesGrid housesList={getSortedCardData()} />
      </div>
    </section>
  );
};

export default Marketplace;
