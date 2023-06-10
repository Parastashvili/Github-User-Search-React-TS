import "./App.css";
import Heading from "./components/Heading";
import Search from "./components/Search";
import UserInfo from "./components/UserInfo";

function App() {
  return (
    <div className="contentContainer">
      <Heading />
      <Search />
      <UserInfo img="https://avatars.githubusercontent.com/u/126801808?v=4" name="levani"/>
    </div>
  );
}
export default App;
