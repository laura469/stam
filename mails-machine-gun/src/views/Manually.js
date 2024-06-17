import React from 'react';
import '../index.css';
import SendButton from '../components/SendButton';
import AddressesInput from '../components/manually/AdressesInput';
import AddressesManuallyList from '../components/manually/AdressesManuallyList';

export default function Manually() {
  return (
    <div>
      <h2>Manually Only 1 mail</h2>
      <AddressesInput />
      <AddressesManuallyList />
      <SendButton listName="manuallyAddresses" />
    </div>
  );
}
