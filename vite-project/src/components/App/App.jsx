import "./App.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer";
import ItemCard from "../ItemCard/ItemCard";
import ItemModal from "../ItemModal/ItemModal";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import WeatherCard from "../WeatherCard/WeatherCard";

function App() {
  return (
    <>
      <Header />
      <WeatherCard />
      <Main>
        <ItemCard />
      </Main>
      <Footer />
      <ItemModal />
      <ModalWithForm />
    </>
  );
}

export default App;
