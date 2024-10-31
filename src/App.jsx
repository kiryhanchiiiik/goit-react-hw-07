import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import "./App.css";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "./redux/filtersSlice";
import {
  addContact,
  deleteContact,
  selectContacts,
} from "./redux/contactsSlice";
import { useEffect } from "react";
import { fetchContacts } from "./redux/opertions";
function App() {
  // get items, isLoading, error
  const items = useSelector(selectContacts);
  const isLoading = useSelector((state) => state.contactsData.isLoading);
  const error = useSelector((state) => state.contactsData.error);

  // get filter
  const filter = useSelector(selectNameFilter);
  // send data
  const dispatch = useDispatch();

  // get contacts from MockAPi

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // add contacts
  const addNewContact = (newContact) => {
    const finalContact = {
      ...newContact,
      id: nanoid(),
    };

    const action = addContact(finalContact);
    dispatch(action);
  };

  // delete contacts
  const onDeleteContact = (ContactId) => {
    const updatedContacts = items.filter((item) => item.id !== ContactId);
    console.log(updatedContacts);
    const action = deleteContact(ContactId);
    dispatch(action);
  };

  // filter contacts
  const filterContacts = Array.isArray(items)
    ? items.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      )
    : [];
  // set filter
  const handleFilterChange = (newFilter) => {
    const action = changeFilter(newFilter);
    dispatch(action);
  };

  return (
    <div>
      <h1>
        <HiDevicePhoneMobile />
        Phonebook
      </h1>
      <ContactForm />
      <SearchBox />
      {isLoading && !error && <b>Request in progress...</b>}
      {error && <b>Something wrong</b>}
      <ContactList />
    </div>
  );
}

export default App;
