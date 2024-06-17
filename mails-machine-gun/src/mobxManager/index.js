import React from "react";
import { useLocalStore } from "mobx-react";
import {createNotesStore} from "./store";

const StoreContext = React.createContext(null);

export const StoreProvider = ({ children }) =>{
    const store = useLocalStore(createNotesStore);

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};

export const useAddressesStore = () => React.useContext(StoreContext)
