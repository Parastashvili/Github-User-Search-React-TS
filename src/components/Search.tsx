import "./search.css";
import { useState, useEffect } from "react";
import SearchIcon from "../assets/searchIcon";
import axios from "axios";
export default function Search() {
  const [user, setUser] = useState("octocat");
  const [found, setFound] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${user}`);
      const userData = response.data;
      console.log(userData)
      setFound(false);
    } catch (error) {
      setFound(true);
    }
  };
  const submit = async (event: any) => {
    event.preventDefault();
    const searchUserInput = document.querySelector(".searchUser");
    if (searchUserInput instanceof HTMLInputElement) {
      const searchingFor: string = searchUserInput.value;
      setUser(searchingFor);
    }
  };
  useEffect(() => {
    fetchData();
  });
  return (
    <div className="searchCont">
      <form className="searching">
        <div className="searchIco">
          <SearchIcon />
        </div>
        <div className="searchIco"></div>
        <input className="searchUser" placeholder="Search GitHub username…" />
        {found === true ? <p className="notFound">NOT FOUND</p> : null}
      </form>
      <button onClick={submit} className="searchButton">
        Search
      </button>
    </div>
  );
}
