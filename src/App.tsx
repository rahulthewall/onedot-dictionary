import React from "react";
import { Provider } from "react-redux";

import { store } from "./modules/redux";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>Dictionaries</div>
    </Provider>
  );
};

export default App;
