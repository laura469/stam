import React from "react";
import '../../index.css'
import {useAddressesStore} from "../../mobxManager";
import {Observer} from "mobx-react";
import ListItem from "./ListItem";

export default function AddressesManuallyList() {
    const store = useAddressesStore()


    return (<Observer>
        {() =>{
            return (
                <div className="hh">
                    {store.manuallyAddresses.map((address, key) => (
                        <ListItem  email={address.email}
                                   name={address.name}
                                   key={key} woman={address.woman}
                                  addressKey={key}
                        />
                    ))}
                </div>
            )
        }}</Observer>)
}
