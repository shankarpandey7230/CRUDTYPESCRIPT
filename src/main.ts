class Contact {
    public id:number;
    public name:string;
    public phone:number;

    constructor(id:number, name:string, phone:number){
        this.id=id;
        this.name=name;
        this.phone= phone;
      }
  
}
let contacts : Contact[] =[];
let contactId:number =0


function addContact():void {
const nameInput: HTMLInputElement =document.getElementById('name-input') as HTMLInputElement
const phoneInput: HTMLInputElement = document.getElementById('phone-input') as HTMLInputElement

const name:string = nameInput.value
const phone:number = parseInt(phoneInput.value)
    // console.log(name,phone)
    if(name && phone){
        contacts.push(new Contact(contactId++, name, phone))
        renderContact()
        nameInput.value =''
        phoneInput.value =''

    }
    
}
function renderContact():void{
    const contactList:HTMLUListElement = document.getElementById(
        "contact-list"
      ) as HTMLUListElement;
      contactList.innerHTML = "";;
    contacts.forEach(contact => {
        const listItem:HTMLLIElement = document.createElement("li") as HTMLLIElement;
        const divItem:HTMLDivElement = document.createElement("div") as HTMLDivElement;
        divItem.className = "item";
        divItem.innerHTML = `${contact.name}: ${contact.phone}`;
    
      
        listItem.appendChild(divItem);
        contactList.appendChild(listItem)
        // console.log(contact)
    });
}


