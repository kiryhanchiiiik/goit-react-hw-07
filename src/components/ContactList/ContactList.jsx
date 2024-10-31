import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";
const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  const filteredContacts = Array.isArray(contacts)
    ? contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : [];
  return (
    <ul className={css.contactsList}>
      {filteredContacts.map((contact) => {
        return <Contact key={contact.id} contact={contact} />;
      })}
    </ul>
  );
};

export default ContactList;
