import React, {useState} from "react";
import '../../index.css'
import {useAddressesStore} from "../../mobxManager";
import {Observer} from "mobx-react";
import {Switch, TextField, Button} from "@material-ui/core";


export default function AddressesInput() {
    const store = useAddressesStore()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [woman,setWoman] = useState(true)

    function genderHandler(){
        const womenObj = woman !== true
        setWoman(womenObj)
    }
    function nameChangeHandler(e){
        const nameString = e.target.value
        setName(nameString)
    }
    function emailChangeHandler(e){
        const emailString = e.target.value
        setEmail(emailString)
    }
    function addAddressObjHandler(){
        if(!name || !email ) return
        const newAddressObj = {name,email,woman}
        store.pushNewAddress(newAddressObj)
        setName('')
        setEmail('')
    }

    return (<Observer>
        {() =>{
            return (
                <div className="address_inputs">
                    <div className="text_fields">
                        <TextField className="text_input"
                                   id="outlined-basic" label="name"
                                   variant="outlined"
                                   onChange={nameChangeHandler}
                                   value={name}
                        />
                        <TextField id="outlined-basic"
                                   label="email"
                                   className="text_input"
                                   variant="outlined"
                                   onChange={emailChangeHandler}
                                   value={email}
                        />
                    </div>
                    <div className="manually_settings">
                        <div className="switch_gender">
                            <Switch
                                checked={woman}
                                onChange={genderHandler}
                                color="primary"
                                name="checkedB"
                                label="woman"
                                labelPlacement="bottom"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <span>{woman?'woman':'man'}</span>
                        </div>
                        <Button color="primary"
                                variant="contained"
                                className="add_button"
                                onClick={addAddressObjHandler}
                        >Add To The List</Button>
                    </div>

                </div>

            )
        }}</Observer>)
}
