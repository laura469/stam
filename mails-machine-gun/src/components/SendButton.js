import React from 'react';
import '../index.css';
import { Button } from '@material-ui/core';
import { useAddressesStore } from '../mobxManager';
import SendIcon from '@material-ui/icons/Send';

export default function SendButton({ listName }) {
  console.log('listName', listName);
  const store = useAddressesStore();
  console.log(store);
  function sendMailsHandler() {
    if (listName === 'manuallyAddresses') {
      console.log('inn');
      store.sendMail(listName);
      return;
    }
    store.sendMails(listName);
  }
  return (
    <div className="send_button">
      <Button variant="contained" color="primary" onClick={sendMailsHandler}>
        <span>send mails</span>
        <SendIcon className="icon" />
      </Button>
    </div>
  );
}
