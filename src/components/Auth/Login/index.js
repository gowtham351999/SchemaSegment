import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabaseAnonKey, supabaseUrl } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Login = () => {
  const customVariables = {
    default: {
      colors: {
        brand: "teal",
        brandAccent: "teal",
      },
    },
  };
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        navigate("/home/audience");
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!session) {
    return (
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className={style.authProviderContainer}>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa, variables: customVariables }}
                inputProps={{ autoComplete: "off" }}
                providers={[]}
                redirectTo="http://localhost:3000/login"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Login;
