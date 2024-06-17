import React, { useEffect, useState } from 'react';
import '../../index.css';
import {
  Checkbox,
  FormControlLabel,
  Switch,
  TextField,
} from '@material-ui/core';
import { useAddressesStore } from '../../mobxManager';
import { Observer } from 'mobx-react';

export default function ListItem({
  name,
  id,
  position,
  img,
  email,
  addressKey,
  woman,
  dbName,
}) {
  const store = useAddressesStore();
  const [stateName, setStateName] = useState(name);

  function changeDbState(value, prop) {
    console.log(value);
    store.changeDbState(value, prop, addressKey);
  }

  function setNameHandler(e) {
    const name = e.target.value;
    setStateName(name);
  }

  useEffect(() => {
    changeDbState(stateName, 'name');
    console.log(stateName);
  }, [stateName]);

  return (
    <Observer>
      {() => {
        return (
          <div className="address_obj">
            <span className="key_number">{addressKey + 1} </span>
            <div>
              <img src={img} />
            </div>
            <div className="text_data">
              <h4 className="text">{dbName}</h4>
              <h4 className="text">{position}</h4>
              <h4>{email}</h4>
            </div>
            <div className="settings">
              <TextField
                id="outlined-basic"
                label="name"
                variant="outlined"
                onChange={setNameHandler}
                value={name}
              />
              <div className="switch_gender">
                <Switch
                  checked={woman}
                  onClick={() => changeDbState(!woman, 'woman')}
                  color="primary"
                  name="checkedB"
                  label="woman"
                  labelPlacement="bottom"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <span>{woman ? 'woman' : 'man'}</span>
              </div>
            </div>
            <div className="settings">
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" />}
                label="send mail"
                labelPlacement="end"
              />
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" />}
                label="don't show again"
                labelPlacement="end"
              />
            </div>
          </div>
        );
      }}
    </Observer>
  );
}
