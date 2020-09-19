// const bodyParser = require("body-parser");

function renderContacts(contacts) {
    const ul = document.createElement("ul");

    for (let i = 0; i < contacts.length; i++) {
        const li = document.createElement("li");

        li.innerHTML = `
		<p>Name : ${contacts[i].Name}</p>
		<p>Location: ${contacts[i].Location}</p>
        <p>Phone: ${contacts[i].Phone}</p>`

        ul.appendChild(li);
        document.body.appendChild(ul);
    }
}

window.handleContactsRequest = async() => {
    document.body.innerHTML = `
  <h1>Contacts</h1><br>
  <ul class="contacts"></ul>`;


    // make sure the backend api works before working with it here
    // From Benjiamin
    const contactsResponse = await fetch("/api/contacts");
    const contacts = await contactsResponse.json();
    console.log(contacts);

    // const ul = document.querySelector("ul");
    // contacts.forEach((contact) => {
    //     const li = document.createElement("li");
    //     li.innerHTML = ` ${contact.Name} - ${contact.Location}  <br> phone ${contact.Phone}`;
    //     ul.appendChild(li);
    // });
    // make sure the backend api works before working with it here
    fetch("/api/contacts")
        .then((response) => response.json())
        .then(renderContacts);
}