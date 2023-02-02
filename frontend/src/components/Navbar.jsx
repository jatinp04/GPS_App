import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function NavBar(props) {
  const navigate = useNavigate();

  function logout(e) {
    // console.log("Check!");
    e.preventDefault(); //Prevent Reloading
    axios
      .get("http://localhost:7000/logout", { withCredentials: true })
      .then((response) => {
        if (response.status == 200) {
          //Redirect to Login
          navigate("/login");
          
        }
      })
      .catch((Err) => {
        if (Err) {
          alert("Try Again! Some Error has Occured.");
        }
      });
  }

  return (
    <header 
      style={{
        display: "flex",
        marginRight: "0",
        position: "fixed",
        right: "210px",
        top: "80px",
         zIndex:"1",
        
      }}
    >
      <nav>
        <ul>
          <li>
            <LogoutOutlinedIcon  className="logout" style={{ color: "red" }} onClick={logout} >
              Logout
            </LogoutOutlinedIcon>
            
          </li>
        </ul>
      </nav>
    </header>
  );
}
