export function createNotesStore() {
  return {
    addresses: [],
    manuallyAddresses: [],
    manually: false,
    async getAddresses() {
      const response = await fetch('http://localhost:3100/addresses/');
      if (!response) return;
      const data = await response.json();
      if (!data && !data.length) {
        this.addresses = [];
        return;
      }
      this.addresses = [...data];
    },
    pushNewAddress(address) {
      this.manuallyAddresses = [...this.manuallyAddresses, address];
    },
    changMode() {
      console.log(this.manually);
      this.manually = !this.manually;
    },
    deleteAddress(arrayName, key) {
      const array = [...this[arrayName]];
      this[arrayName] = [...array.slice(0, key), ...array.slice(key + 1)];
    },
    async sendMails(listName) {
      const list = this[listName];
      const newList = list.map((address) => {
        return { ...address, versionId: 1 };
      });
      const response = await fetch('http://localhost:3100/mail/send', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newList),
      });
      const data = await response.json();
      console.log(data);
      if (listName === 'addresses') await this.getAddresses();
    },
    async sendMail(listName) {
      const list = this[listName];
      const newList = list.map((address) => {
        return { ...address, versionId: 1 };
      });
      const response = await fetch('http://localhost:3100/mail/send/one', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newList),
      });
      const data = await response.json();
      console.log(data);
      if (listName === 'addresses') await this.getAddresses();
    },
    changeDbState(value, prop, addressKey) {
      this.addresses[addressKey][prop] = value;
    },
  };
}
