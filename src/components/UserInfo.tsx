import Addition from "./Addition";
import "./userInfo.css";
import Company from "../assets/company";
import Twitter from "../assets/twitter";
import Location from "../assets/location";
import Website from "../assets/website";
export default function UserInfo(props: any) {
  return (
    <div className="userContainerOut">
      <div className="userContainerTop">
        <img className="avatar" src={props.img} alt="user Avatar" />
        <div className="userInfo">
          <h4 className="userName">{props.name}</h4>
          <h5 className="userUser">{props.login}</h5>
          <h6 className="userJoined">{props.created_at}</h6>
        </div>
      </div>
      <p className="userBio">
        {props.bio}
      </p>
      <div className="userFollowers">
        <div>
          <p className="repoFollowers">Repos</p>
          <h3 className="numberInfo">{props.public_repos}</h3>
        </div>
        <div>
          <p className="repoFollowers">Followers</p>
          <h3 className="numberInfo">{props.followers}</h3>
        </div>
        <div>
          <p className="repoFollowers">Following</p>
          <h3 className="numberInfo">{props.following}</h3>
        </div>
      </div>
      <div className="footer">
        <div className="contact">
          <div className="iconBox">
            <Location />
          </div>
          <Addition dsc={props.location} />
        </div>
        <div className="contact">
          <div className="iconBox">
            <Website />
          </div>
          <Addition dsc={props.blog} />
        </div>
        <div className="contact">
          <div className="iconBox">
            <Twitter />
          </div>
          <Addition dsc={props.twitter_username} />
        </div>
        <div className="contact">
          <div className="iconBox">
            <Company />
          </div>
          <Addition dsc={props.company} />
        </div>
      </div>
    </div>
  );
}
