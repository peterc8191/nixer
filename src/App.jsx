import useRoute from "./hooks/useRoute.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Pricing from "./pages/Pricing.jsx";
import Book from "./pages/Book.jsx";
import Nixers from "./pages/Nixers.jsx";
import Become from "./pages/Become.jsx";

const PAGES = {
  "/": Home,
  "/services": Services,
  "/pricing": Pricing,
  "/book": Book,
  "/nixers": Nixers,
  "/become": Become,
};

export default function App() {
  const { path, params } = useRoute();
  const Page = PAGES[path] || Home;
  return (
    <>
      <Header path={path} />
      <main id="main">
        <Page params={params} key={path} />
      </main>
      <Footer />
    </>
  );
}
