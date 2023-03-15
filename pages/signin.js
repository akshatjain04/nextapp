import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

var axios = require("axios");
var qs = require("qs");

export default function SigninForm() {
  const router = useRouter();

  const [cookie, setCookie] = useCookies(["user"]);

  const userLogin = async (event) => {
    event.preventDefault();

    var data = qs.stringify({
      email: `${event.target.email.value}`,
      contactnumber: `${event.target.contactnumber.value}`,
    });

    var config = {
      method: "post",
      url: "http://localhost:4000/app/signin",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        localStorage.setItem("user", response.data.fullname);
        setCookie("user", response.data.fullname, {
          path: "/",
          sameSite: true,
        });

        router.push("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div class="container">
      <form onSubmit={userLogin}>
        <div class="row">
          <div class="col-25">
            <label for="email">Email:</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="email"
              name="email"
              minLength="5"
              placeholder="Your Email.."
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="contactnumber">Phone Number:</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="contactnumber"
              name="contactnumber"
              pattern="[0-9]{10}"
              title="10 digit number."
              placeholder="Your phone number.."
              required
            />
          </div>
        </div>
        <br></br>
        <div class="row">
          <button type="submit">SignIn</button>
        </div>
      </form>
    </div>
  );
}
