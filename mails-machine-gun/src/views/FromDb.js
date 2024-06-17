import React from "react";
import '../index.css'
import List from "../components/fromDb/List";
import SendButton from "../components/SendButton";


export default function FromDb() {


    return <div>
        <h2>From Database</h2>
             <List/>
             <SendButton listName="addresses"/>
            </div>

}
