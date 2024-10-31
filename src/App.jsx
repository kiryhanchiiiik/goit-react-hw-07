import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import "./App.css";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "./redux/filtersSlice";
import { selectContacts } from "./redux/contactsSlice";
import { useEffect } from "react";
import { fetchContacts } from "./redux/opertions";
function App() {
  const dispatch = useDispatch();
  const items = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  const isLoading = useSelector((state) => state.contactsData.isLoading);
  const error = useSelector((state) => state.contactsData.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleFilterChange = (newFilter) => {
    dispatch(changeFilter(newFilter));
  };

  return (
    <div>
      <h1>
        <HiDevicePhoneMobile />
        Phonebook
      </h1>
      <ContactForm />
      <SearchBox onFilterChange={handleFilterChange} />
      {isLoading && !error && <b>Request in progress...</b>}
      {error && <b>Something wrong</b>}
      <ContactList contacts={items} />
    </div>
  );
}

export default App;
