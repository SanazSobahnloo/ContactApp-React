import React, { useState } from "react";
import ContactsList from "./ContactsList";
import inputs from "../constants/inputs";
import styles from "./Contacts.module.css";
import { v4 } from "uuid";
const Contact = () => {
  // ***** States *****
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState();
  const [contact, setContact] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });
  // ***** Functions *****
  const changeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setContact((contact) => ({ ...contact, [name]: value }));
  };
  const addHandler = () => {
    if (
      !contact.name ||
      !contact.lastName ||
      !contact.email ||
      !contact.phone
    ) {
      setAlert("Please enter a valid data!");
      return;
    }
    setAlert("");
    const newContact = { ...contact, id: v4() };
    setList((list) => [...list, newContact]);
    setContact({ name: "", lastName: "", email: "", phone: "" });
  };
  const deleteHandler = (id) => {
    const newContacts = list.filter((contact) => contact.id !== id);
    setList(newContacts);
  };
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {inputs.map((input, index) => (
          <input
            key={index}
            type={input.type}
            placeholder={input.placeholder}
            name={input.name}
            value={contact[input.name]}
            onChange={changeHandler}
          />
        ))}
        <button onClick={addHandler}>add</button>
      </div>
      <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
      <ContactsList list={list} deleteHandler={deleteHandler} />
    </div>
  );
};

export default Contact;
