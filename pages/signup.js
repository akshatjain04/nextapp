import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

var axios = require("axios");
var qs = require("qs");

export default function SignupForm() {
  const router = useRouter();

  const [cookie, setCookie] = useCookies(["user"]);

  const userSignup = async (event) => {
    event.preventDefault();

    var data = qs.stringify({
      fullname: `${event.target.fullname.value}`,
      email: `${event.target.email.value}`,
      contactnumber: `${event.target.contactnumber.value}`,
      address: `${event.target.address.value}`,
    });

    var config = {
      method: "post",
      url: "http://localhost:4000/app/signup",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.status === "PASSED") {
          localStorage.setItem("user", response.data.fullname);
          setCookie("user", response.data.fullname, {
            path: "/",
            sameSite: true,
          });

          router.push("/dashboard");
        } else {
          router.push("/signup");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div class="container">
      <form onSubmit={userSignup}>
        <div class="row">
          <div class="col-25">
            <label for="fullname">Name:</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="fullname"
              name="fullname"
              minLength="5"
              placeholder="Your name.."
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="email">Email:</label>
          </div>
          <div class="col-75">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email id.."
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
        <div class="row">
          <div class="col-25">
            <label for="address">Address:</label>
          </div>
          <div class="col-75">
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Your Address.."
              minLength="10"
              required
            />
          </div>
        </div>
        <br></br>
        <div class="row">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
