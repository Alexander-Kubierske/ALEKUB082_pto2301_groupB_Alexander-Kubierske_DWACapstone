import { Auth } from "@supabase/auth-ui-react";
import supabase from "../services/supaBaseConnector";
import { ThemeSupa } from '@supabase/auth-ui-shared'

const LoginForm: React.FC = () => {

  const loginLocalization = {
    variables: {
      sign_up: {
        link_text: "", // Customize the link text for sign in
      },
    },
  };

  const onLogin = () => {
    console.log("Logged in")
  }

  // <=========== Output ===========>

  return (
    <div>
      <Auth
      providers={[]}
      supabaseClient={supabase}
      view="sign_in"
      onSuccess={onLogin}
      localization={loginLocalization}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: '#1976d2',
              brandAccent: 'red',
            },
          },
        },
      }}
    />
    </div>
  );
};

export default LoginForm;
