import axios from "axios";
import { useState, useEffect } from "react";

const useDropdownOptions = () => {
  const [occupations, setOccupations] = useState([]);

  const [states, setStates] = useState([]);

  //On initial render, get all dropdown options needed for form
  useEffect(() => {
    const getDropdownOptions = async () => {
      const response = await axios.get(
        "https://frontend-take-home.fetchrewards.com/form"
      );

      setOccupations(response.data.occupations);

      //States data is stored inside objects, so unpack and place
      //plainly inside statesArray
      const statesArray = [];

      response.data.states.forEach((stateObject) => {
        statesArray.push(`${stateObject.name}, ${stateObject.abbreviation}`);
      });

      setStates(statesArray);
    };

    getDropdownOptions();
  }, []);

  return { occupations, states };
};

export default useDropdownOptions;
