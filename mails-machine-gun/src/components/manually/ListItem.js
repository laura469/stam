import React, {useState} from "react";
import '../../index.css'
import {IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {useAddressesStore} from "../../mobxManager";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import EditIcon from '@material-ui/icons/Edit';

export default function ListItem({name,email,woman, addressKey}) {
    const store = useAddressesStore()

    function editAddressHandler(){
        store.editAddress(name,email,woman)
        deleteAddressHandler()
    }

    function deleteAddressHandler(){
        store.deleteAddress('manuallyAddresses',addressKey)
    }
    return(
        <div className="simple_address">
            <div className="icons_div">
                <MailOutlineIcon fontSize={"large"}/>
            </div>

            <div className="text_data">
                <h4 className="text">{name}</h4>
                <h4>{email}</h4>
                <h4>{woman?'woman':'man'}</h4>
            </div>
            <div className="icons_div">
                <IconButton onClick={deleteAddressHandler} aria-label="delete" >
                    <DeleteIcon fontSize={"large"}/>
                </IconButton>
                <IconButton onClick={editAddressHandler} aria-label="delete" >
                    <EditIcon fontSize={"large"}/>
                </IconButton>
            </div>
        </div>
    )

}
