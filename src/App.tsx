import { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from "./assets/searchIcon";
import Company from "./assets/company";
import Twitter from "./assets/twitter";
import Location from "./assets/location";
import Website from "./assets/website";
import Moon from "./assets/moon";
import Sun from "./assets/sun";
import "./css/heading.css";
import "./css/search.css";
import "./css/addition.css";
import "./css/userInfo.css";
import "./css/App.css";
function App() {
  const light = () => {
    document.documentElement.style.setProperty("--bgColor", "#f6f8ff");
    document.documentElement.style.setProperty("--devFinder", "#222731");
    document.documentElement.style.setProperty("--themeColor", "#4b6a9b");
    document.documentElement.style.setProperty("--searchBG", "#fefefe");
    document.documentElement.style.setProperty("--searchButton", "#0079ff");
    document.documentElement.style.setProperty("--userBG", "#fefefe");
    document.documentElement.style.setProperty("--userName", "#2b3442");
    document.documentElement.style.setProperty("--userUser", "#0079ff");
    document.documentElement.style.setProperty("--userJoined", "#697c9a");
    document.documentElement.style.setProperty("--userBio", "#4b6a9b");
    document.documentElement.style.setProperty("--followersBG", "#f6f8ff");
    document.documentElement.style.setProperty("--repoFollowers", "#4b6a9b");
    document.documentElement.style.setProperty("--numberInfo", "#2b3442");
    document.documentElement.style.setProperty("--contactText", "#4b6a9b");
    document.documentElement.style.setProperty("--inputColor", "#4b6a9b");
  };
  const dark = () => {
    document.documentElement.style.setProperty("--bgColor", "#141D2F");
    document.documentElement.style.setProperty("--devFinder", "#FFFFFF");
    document.documentElement.style.setProperty("--themeColor", "#FFFFFF");
    document.documentElement.style.setProperty("--searchBG", "#1E2A47");
    document.documentElement.style.setProperty("--searchButton", "#0079ff");
    document.documentElement.style.setProperty("--userBG", "#1E2A47");
    document.documentElement.style.setProperty("--userName", "#FFFFFF");
    document.documentElement.style.setProperty("--userUser", "#0079FF");
    document.documentElement.style.setProperty("--userJoined", "#FFFFFF");
    document.documentElement.style.setProperty("--userBio", "#FFFFFF");
    document.documentElement.style.setProperty("--followersBG", "#141D2F");
    document.documentElement.style.setProperty("--repoFollowers", "#FFFFFF");
    document.documentElement.style.setProperty("--numberInfo", "#FFFFFF");
    document.documentElement.style.setProperty("--contactText", "#FFFFFF");
    document.documentElement.style.setProperty("--inputColor", "#FFFFFF");
  };
  const currentMode = localStorage.getItem("dark-mode");
  if (currentMode === "off") {
    light();
  } else {
    dark();
  }
  const [theme, setTheme] = useState(currentMode === "off" ? true : false);
  const themeChange = () => {
    setTheme(!theme);
    if (theme === true) {
      localStorage.setItem("dark-mode", "on");
      dark();
    } else {
      localStorage.setItem("dark-mode", "off");
      light();
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
      const formatedMonth = month[num - 1];
      const formatedDate = `Joined ${day} ${formatedMonth} ${joinData[0]}`;
      setFound(false);
      setUserAvatar(userData.avatar_url);
      setUserName(userData.name);
      setUserLink(userData.html_url);
      setUserLogin("@" + userData.login);
      setUserCreated_at(formatedDate);
      if (userData.bio === null) {
        setUserBio("Bio is not Available");
      } else {
        setUserBio(userData.bio);
      }
      setUserFollowers(userData.followers);
      setUserRepos(userData.public_repos);
      setUserFollowing(userData.following);
      if (userData.location === null || userData.location === "") {
        setUserLocation("Not Available");
        document.getElementById(userLocation)?.classList.add("userOpac");
      } else {
        setUserLocation(userData.location);
        document.getElementById(userLocation)?.classList.remove("userOpac");
      }
      if (userData.blog === null || userData.blog === "") {
        setUserWebsite("Not Available");
        document.getElementById(userWebsite)?.classList.add("userOpac");
      } else {
        setUserWebsite(userData.blog);
        document.getElementById(userWebsite)?.classList.remove("userOpac");
      }
      if (
        userData.twitter_username === null ||
        userData.twitter_username === ""
      ) {
        setUserTwitter("Not Available");
        document.getElementById(userTwitter)?.classList.add("userOpac");
      } else {
        setUserTwitter(userData.twitter_username);
        document.getElementById(userTwitter)?.classList.remove("userOpac");
      }
      if (userData.company === null || userData.company === "") {
        document.getElementById(userCompany)?.classList.add("userOpac");
        setUserCompany("Not Available");
      } else {
        setUserCompany(userData.company);
        document.getElementById(userCompany)?.classList.remove("userOpac");
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
  const [userLink, setUserLink] = useState("");
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
        </form>
        {found === true ? <p className="notFound">No Result</p> : null}
        <button onClick={submit} className="searchButton">
          Search
        </button>
      </div>
      <div className="userContainerOut">
        <div className="userContainerTop">
          <img className="avatar" src={userAvatar} alt="user Avatar" />
          <div className="userInfo">
            <h4 className="userName">{userName}</h4>
            <a
              className="userUser"
              href={userLink}
              target="_blank"
              rel="noreferrer"
            >
              {userLogin}
            </a>
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
              <p className="dscTxt userOpac" id={userLocation}>
                {userLocation}
              </p>
            </div>
          </div>
          <div className="contact">
            <div className="iconBox">
              <Website />
            </div>
            <div className="additionCont">
              <a
                id={userWebsite}
                href={userWebsite}
                rel="noreferrer"
                target="_blank"
                className="dscTxt userOpac"
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
              <a
                id={userTwitter}
                className="dscTxt userOpac"
                href={"https://twitter.com/" + userTwitter}
                rel="noreferrer"
                target="_blank"
              >
                {userTwitter}
              </a>
            </div>
          </div>
          <div className="contact">
            <div className="iconBox">
              <Company />
            </div>
            <div className="additionCont">
              <a className="dscTxt userOpac" id={userCompany}>
                {userCompany}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
