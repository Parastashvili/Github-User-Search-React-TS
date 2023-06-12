import "./App.css";
import Moon from "./assets/moon";
import Sun from "./assets/sun";
import "./components/heading.css";
import "./components/search.css";
import { useState, useEffect } from "react";
import SearchIcon from "./assets/searchIcon";
import axios from "axios";
import Company from "./assets/company";
import Twitter from "./assets/twitter";
import Location from "./assets/location";
import Website from "./assets/website";
import "./components/addition.css";
import "./components/userInfo.css";
function App() {
  const currentMode = localStorage.getItem("dark-mode");
  const [theme, setTheme] = useState(currentMode === "off" ? true : false);
  const themeChange = () => {
    setTheme(!theme);
    if (theme === true) {
      localStorage.setItem("dark-mode", "on");
    } else {
      localStorage.setItem("dark-mode", "off");
    }
  };
  const reload = () => {
    window.location.reload();
  };
  const [user, setUser] = useState("parastashvili");
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [found, setFound] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${user}`);
      const userData = response.data;
      const joinData = userData.created_at.split("-");
      let num;
      let day = joinData[2].split("T")[0];
      if (joinData[1] < 10) {
        num = joinData[1].split("")[1];
      } else {
        num = joinData[1];
      }
      console.log(userData);
      const formatedMonth = month[num - 1];
      const formatedDate = `Joined ${day} ${formatedMonth} ${joinData[0]}`;
      setFound(false);
      setUserAvatar(userData.avatar_url);
      setUserName(userData.name);
      setUserLogin("@" + userData.login);
      setUserCreated_at(formatedDate);
      setUserBio(userData.bio);
      setUserFollowers(userData.followers);
      setUserRepos(userData.public_repos);
      setUserFollowing(userData.following);
      if (userData.location === "") {
        setUserLocation("Not Available");
      } else {
        setUserLocation(userData.location);
      }
      if (userData.blog === "") {
        setUserWebsite("Not Available");
      } else {
        setUserWebsite(userData.blog);
      }
      if (userData.twitter_username === null) {
        setUserTwitter("Not Available");
      } else {
        setUserTwitter(userData.twitter_username);
      }
      if (userData.company === "") {
        setUserCompany("Not Available");
      } else {
        setUserCompany(userData.company);
      }
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
  const [userAvatar, setUserAvatar] = useState(
    "https://avatars.githubusercontent.com/u/126801808?v=4"
  );
  const [userName, setUserName] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [userCreated_at, setUserCreated_at] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userFollowers, setUserFollowers] = useState("");
  const [userFollowing, setUserFollowing] = useState("");
  const [userRepos, setUserRepos] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userWebsite, setUserWebsite] = useState("");
  const [userTwitter, setUserTwitter] = useState("");
  const [userCompany, setUserCompany] = useState("");

  return (
    <div className="contentContainer">
      <div className="headerCont">
        <h1 className="devFinder" onClick={reload}>
          devfinder
        </h1>
        <div className="themeCont" onClick={themeChange}>
          <h2 className="themeTxt">{theme ? "DARK" : "LIGHT"}</h2>
          {theme ? <Moon /> : <Sun />}
        </div>
      </div>
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
      <div className="userContainerOut">
        <div className="userContainerTop">
          <img className="avatar" src={userAvatar} alt="user Avatar" />
          <div className="userInfo">
            <h4 className="userName">{userName}</h4>
            <h5 className="userUser">{userLogin}</h5>
            <h6 className="userJoined">{userCreated_at}</h6>
          </div>
        </div>
        <p className="userBio">{userBio}</p>
        <div className="userFollowers">
          <div>
            <p className="repoFollowers">Repos</p>
            <h3 className="numberInfo">{userRepos}</h3>
          </div>
          <div>
            <p className="repoFollowers">Followers</p>
            <h3 className="numberInfo">{userFollowers}</h3>
          </div>
          <div>
            <p className="repoFollowers">Following</p>
            <h3 className="numberInfo">{userFollowing}</h3>
          </div>
        </div>
        <div className="footer">
          <div className="contact">
            <div className="iconBox">
              <Location />
            </div>
            <div className="additionCont">
              <p className="dscTxt">{userLocation}</p>
            </div>
          </div>
          <div className="contact">
            <div className="iconBox">
              <Website />
            </div>
            <div className="additionCont">
              <a
                href={"https://" + userWebsite}
                target="_blank"
                className="dscTxt"
              >
                {userWebsite}
              </a>
            </div>
          </div>
          <div className="contact">
            <div className="iconBox">
              <Twitter />
            </div>
            <div className="additionCont">
              <p className="dscTxt">{userTwitter}</p>
            </div>
          </div>
          <div className="contact">
            <div className="iconBox">
              <Company />
            </div>
            <div className="additionCont">
              <p className="dscTxt">{userCompany}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
