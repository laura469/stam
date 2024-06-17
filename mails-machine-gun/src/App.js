import './App.css';
import React, {useEffect} from "react";
import Header from "./components/Header";
import {useAddressesStore} from "./mobxManager";
import ModeSelector from "./components/ModeSelector";
import FromDb from "./views/FromDb";
import Manually from "./views/Manually";
import {Observer} from "mobx-react";

function App() {
    const store = useAddressesStore()
    useEffect(() => {
        store.getAddresses()
    }, [])
    return (<Observer>
        {() =>{
    return <div className="App">
                <Header/>
                    <ModeSelector/>
                    <div className="list_div">
                        {store.manually ? <FromDb/> : <Manually/>}
                    </div>
            </div>
}}</Observer>)
}

export default App;
