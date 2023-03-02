import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { client } from "../client";

function Login() {
  const navigate = useNavigate();

  const responseGoogle = (credentialResponse) => {
    if (credentialResponse.credential != null) {
      const USER_CREDENTIAL = jwtDecode(credentialResponse.credential);

      localStorage.setItem("user", JSON.stringify(USER_CREDENTIAL));

      const { sub, given_name, picture } = USER_CREDENTIAL;

      const doc = {
        _id: sub,
        _type: "user",
        userName: given_name,
        image: picture,
      };

      client.createIfNotExists(doc).then(() => {
        navigate("/", { replace: true });
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-5">
        <div className="flex items-center gap-2">
          <img src="vite.svg" alt="logo" />
          <h1 className="text-2xl font-bold text-gray-700">ShareKar</h1>
        </div>
        <div>
          <GoogleLogin
            onSuccess={responseGoogle}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Login;
