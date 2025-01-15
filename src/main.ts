interface Contact {
  id: number;
  name: string;
  phone: number;
}

let contacts: Contact[] = [];

// load from local storage
const loadFromLocalStorage = (key: string): Contact[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

contacts = loadFromLocalStorage("contacts");

let contactId: number = contacts[contacts.length - 1]
  ? contacts[contacts.length - 1].id + 1
  : 0;
renderContacts();

function addContact() {
  const nameInput: HTMLInputElement = document.getElementById(
    "name-input"
  ) as HTMLInputElement;
  const phoneInput: HTMLInputElement = document.getElementById(
    "phone-input"
  ) as HTMLInputElement;
  const name: string = nameInput.value.trim();
  const phone: number = parseInt(phoneInput.value.trim());

  if (name && phone) {
    contacts.push({ id: contactId++, name, phone });
    nameInput.value = "";
    phoneInput.value = "";

    // save to local storage
    const saveToLocalStorage = (key: string, data: Contact[]): void => {
      localStorage.setItem(key, JSON.stringify(data));
    };

    saveToLocalStorage("contacts", contacts);

    renderContacts();
  }
}

function deleteContact(id: number) {
  contacts = contacts.filter((contact) => contact.id !== id);
  // save to local storage
  const saveToLocalStorage = (key: string, data: Contact[]): void => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  saveToLocalStorage("contacts", contacts);
  renderContacts();
}

function updateContact(id: number) {
  const contact: Contact | undefined = contacts.find((c) => c.id === id);
  if (contact) {
    const idInput: HTMLInputElement = document.getElementById(
      "id-input"
    ) as HTMLInputElement;
    const nameInput: HTMLInputElement = document.getElementById(
      "name-input"
    ) as HTMLInputElement;
    const phoneInput: HTMLInputElement = document.getElementById(
      "phone-input"
    ) as HTMLInputElement;

    const updateButton: HTMLButtonElement = document.getElementById(
      "update-button"
    ) as HTMLButtonElement;
    const addButton: HTMLButtonElement = document.getElementById(
      "add-button"
    ) as HTMLButtonElement;
    const resetButton: HTMLButtonElement = document.getElementById(
      "reset-button"
    ) as HTMLButtonElement;

    updateButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
    addButton.classList.add("hidden");

    idInput.value = contact.id.toString();
    nameInput.value = contact.name;
    phoneInput.value = contact.phone.toString();
  }
}

function updateContactData() {
  const idInput: HTMLInputElement = document.getElementById(
    "id-input"
  ) as HTMLInputElement;
  const id: number = parseInt(idInput.value);
  const index = contacts.findIndex((element) => element.id === id);

  if (index !== -1) {
    const nameInput: HTMLInputElement = document.getElementById(
      "name-input"
    ) as HTMLInputElement;
    const phoneInput: HTMLInputElement = document.getElementById(
      "phone-input"
    ) as HTMLInputElement;

    contacts[index].name = nameInput.value;
    contacts[index].phone = parseInt(phoneInput.value);

    const updateButton: HTMLButtonElement = document.getElementById(
      "update-button"
    ) as HTMLButtonElement;
    const addButton: HTMLButtonElement = document.getElementById(
      "add-button"
    ) as HTMLButtonElement;
    const resetButton: HTMLButtonElement = document.getElementById(
      "reset-button"
    ) as HTMLButtonElement;

    updateButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    addButton.classList.remove("hidden");

    nameInput.value = "";
    phoneInput.value = "";

    // save to local storage
    const saveToLocalStorage = (key: string, data: Contact[]): void => {
      localStorage.setItem(key, JSON.stringify(data));
    };

    saveToLocalStorage("contacts", contacts);

    renderContacts();
  }
}

function resetInputForm() {
  const idInput: HTMLInputElement = document.getElementById(
    "id-input"
  ) as HTMLInputElement;
  const nameInput: HTMLInputElement = document.getElementById(
    "name-input"
  ) as HTMLInputElement;
  const phoneInput: HTMLInputElement = document.getElementById(
    "phone-input"
  ) as HTMLInputElement;

  idInput.value = "";
  nameInput.value = "";
  phoneInput.value = "";

  const updateButton: HTMLButtonElement = document.getElementById(
    "update-button"
  ) as HTMLButtonElement;
  const addButton: HTMLButtonElement = document.getElementById(
    "add-button"
  ) as HTMLButtonElement;

  const resetButton: HTMLButtonElement = document.getElementById(
    "reset-button"
  ) as HTMLButtonElement;

  updateButton.classList.add("hidden");
  resetButton.classList.add("hidden");
  addButton.classList.remove("hidden");
}

function renderContacts() {
  const contactList = document.getElementById(
    "contact-list"
  ) as HTMLUListElement;
  contactList.innerHTML = "";
  const contactCounter = document.getElementById(
    "contact-counter"
  ) as HTMLSpanElement;
  contactCounter.innerHTML = contacts.length.toString();
  contacts.forEach((contact) => {
    const listItem = document.createElement("li");
    const divItem = document.createElement("div");
    divItem.className = "item";
    divItem.innerHTML = `${contact.name}: ${contact.phone}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    deleteButton.onclick = () => deleteContact(contact.id);

    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.className = "update";
    updateButton.onclick = () => updateContact(contact.id);

    listItem.appendChild(divItem);
    listItem.appendChild(updateButton);
    listItem.appendChild(deleteButton);

    contactList.appendChild(listItem);
  });
}
