import { Auth } from "@supabase/auth-ui-react";
import supabase from "../services/supaBaseConnector";
import { ThemeSupa } from '@supabase/auth-ui-shared'


const SignUpForm = () => {

  const signInLocalization = {
    variables: {
      sign_in: {
        link_text: "",
      },
    },
  };

  const test = () => console.log("test")

  const onAuthStateChange = (event: any, session: any) => {
    test()
 
    if (event === 'SIGNED_IN' && session?.user?.email === userEmail) {

      // onSignup(session.user);
      
    }
  };

  const onSignup = async (user) => {
    try {
      const { data, error } = await supabase
        .from('public.users')
        .insert(
          {
            user_id: user.id,
            email: user.email,
            favorite_eps: [null],
            subscribed: [null],
            progress: [null],
          },
        );

      if (error) {
        console.error('Error inserting user data:', error.message);
        return;
      }

      console.log('User signed up successfully:', data);
    } catch (error) {
      console.error('Unhandled error:', error.message);
    }
  };
 

  // <=========== Output ===========>

  return (
    <div>
      <Auth
      providers={[]}
      supabaseClient={supabase}
      view="sign_up"
      onSuccess={onAuthStateChange}
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
