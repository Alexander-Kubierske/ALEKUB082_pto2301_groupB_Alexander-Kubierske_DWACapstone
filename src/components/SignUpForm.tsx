import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import supabase from "../services/supaBaseConnector";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

const SignUpForm = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  const signInLocalization = {
    variables: {
      sign_in: {
        link_text: "",
      },
    },
  };

  useEffect(() => {
    const getUserID = async () => {
      if (user !== "check") {
        return;
      } else {
        await supabase.auth.getUser().then((value) => {
          if (value.data?.user) {
            setUser(value.data.user.id);
          }
        });
      }
    };
    getUserID();
  }, [user]);

  supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN") {
      setUser("check");
      navigate("/");
    }
  });

  // <=========== Output ===========>

  return (
    <div>
      <Auth
        providers={[]}
        supabaseClient={supabase}
        view="sign_up"
        localization={signInLocalization}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#1976d2",
                brandAccent: "red",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default SignUpForm;
