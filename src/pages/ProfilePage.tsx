import { useEffect, useState } from "react";
import supabase from "../services/supaBaseConnector";
import { Typography, Divider, Button, Paper } from "@mui/material";
import { useUserStore } from "../store/userStore";
import CancelIcon from "@mui/icons-material/Cancel";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import {
  ConfirmResetProgress,
  FavoritesDialog,
} from "../components/1componentIndex";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUserData, setUser } = useUserStore();
  const [userEmail, setUserEmail] = useState();

  const fetchUserEmail = useEffect(() => {
    const getUserEmail = async () => {
      await supabase.auth.getUser().then((value) => {
        setUserEmail(value.data?.user?.email);
      });
    };
    getUserEmail();
  }, []);

  // <=========== Navigation Logic ===========>

  const handleNavigateBack = () => {
    navigate("/");
  };

  // <=========== View Favorites Logic ===========>

  //   we pass the favorite episodes array from here

  // <=========== SignOut Logic ===========>

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    setUser("");
    setUserData("");
    navigate("/login");
  };

  return (
    <Paper
      sx={{
        margin: "20%",

        "@media (max-width: 600px)": {
          marginTop: "50%",
          marginLeft: "3%",
          marginRight: "3%",
        },
      }}
    >
      <div
        className="profile--container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          className="profile--header"
          style={{
            padding: "0.5rem",
          }}
        >
          <Button onClick={handleNavigateBack}>
            <CancelIcon fontSize="large" sx={{ color: "#1976d2" }} />
          </Button>
          <Typography sx={{ paddingTop: "3%" }}>{userEmail}</Typography>
          <Divider />
        </div>
        <div
          className="profile--content"
          style={{
            padding: "0.5rem",
          }}
        >
          <FavoritesDialog />
        </div>
        <div
          className="profile--footer"
          style={{
            padding: "0.5rem",
          }}
        >
          <Divider />
          <ConfirmResetProgress />
          <Divider />
          <Button onClick={handleSignOut}>
            <Typography sx={{ color: "#1976d2" }}>Sign Out</Typography>{" "}
            <LogoutIcon sx={{ paddingLeft: "3%", color: "#FF000C" }} />
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default ProfilePage;
