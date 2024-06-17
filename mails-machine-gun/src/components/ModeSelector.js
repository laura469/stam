import React from 'react';
import '../index.css';
import { Button, ButtonGroup } from '@material-ui/core';
import { useAddressesStore } from '../mobxManager';
import { Observer } from 'mobx-react';

export default function ModeSelector() {
  const store = useAddressesStore();

  function modeHandler() {
    store.changMode();
  }
  return (
    <Observer>
      {() => {
        return (
          <div className="mode_selector">
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
            >
              <Button disabled={store.manually === true} onClick={modeHandler}>
                From Database
              </Button>
              <Button
                disabled={store.manually === false}
                onClick={modeHandler}
                style={{ display: 'none' }}
              >
                Add Manually
              </Button>
            </ButtonGroup>
          </div>
        );
      }}
    </Observer>
  );
}
