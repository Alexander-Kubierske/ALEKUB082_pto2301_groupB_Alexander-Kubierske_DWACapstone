import { Auth } from "@supabase/auth-ui-react";
import supabase from "../services/supaBaseConnector";
import { ThemeSupa } from '@supabase/auth-ui-shared'


const SignUpForm = () => {

  const signInLocalization = {
    variables: {
      sign_in: {
        link_text: "", // Customize the link text for sign in
      },
    },
  };

  const onSignup = () => {
    console.log("signed up")
  }
 

  // <=========== Output ===========>

  return (
    <div>
      <Auth
      providers={[]}
      supabaseClient={supabase}
      view="sign_up"
      onSuccess={onSignup}
      localization={signInLocalization}
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

export default SignUpForm;
2