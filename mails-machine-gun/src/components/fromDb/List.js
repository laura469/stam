import React from "react";
import '../../index.css'
import {Observer, useObserver} from "mobx-react";
import { useAddressesStore } from "../../mobxManager";
import ListItem from "./ListItem";
import {Button} from "@material-ui/core";


export default function List() {
    const store = useAddressesStore()
    function getAddressesDataHandler(){
        store.getAddresses()
    }
    return (<Observer>
        {() =>{
            return(
            <div className="list">
                <Button
                onClick={getAddressesDataHandler}
                variant={"outlined"}
                >Load MMG</Button>
                {store.addresses.map((address, key) => (
                  <ListItem img={address.img} email={address.email}
                            id={address.Id} name={address.name}
                            position={address.position} key={key}
                            addressKey={key} woman={address.woman}
                            dbName={address.dbName}
                  />
                ))}
            </div>
        )
        }}</Observer>)
}
