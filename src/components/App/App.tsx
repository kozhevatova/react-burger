import React, { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import appStyles from "./App.module.css";
import { data } from "../../utils/data";
import api from "../../utils/api";

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    api
      .getIngredients()
      .then((data) => {
        if (data.data) {
          setIngredients(data.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={appStyles.App}>
      <AppHeader />
      <Main data={ingredients} />
    </div>
  );
}

export default App;
