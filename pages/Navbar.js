import NextLink from "next/link";
import { useRouter } from "next/router";

// import { parseCookies } from "../helpers/";

// Navbar.getInitialProps = async ({ req, res }) => {
//   const data = parseCookies(req);

//   if (res) {
//     if (Object.keys(data).length === 0 && data.constructor === Object) {
//       res.writeHead(301, { Location: "/" });
//       res.end();
//     }
//   }

//   console.log("lkjkokjkjkojnkjnkmnmk     ", data);

//   return {
//     data: data && data,
//   };
// };

export default function Navbar({ data }) {
  const router = useRouter();

  const showProfile = (e) => {
    let user = localStorage.getItem("user");
    router.push(`/user/${user}`);
  };

  const logoutUser = (e) => {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <body>
      <header class='site-header'>
        <div class='site-identity'>
          <img src='roost icon.jfif' width='40' height='40'></img>
          <font face='Arial' size='40' color='#996515'>
            Roost Demo App
          </font>
        </div>
        <nav class='site-navigation'>
          <ul class='nav'>
            <li>
              <a href='\'>Home</a>
            </li>
            <li>
              <a href='https://roost.ai/'>About</a>
            </li>
            <li>
              <a onClick={showProfile} style={{ cursor: "pointer" }}>
                Profile
              </a>
            </li>
            <li>
              <a href='https://roost.ai/contact-the-folks-at-roost'>Contact</a>
            </li>
            <li>
              <a onClick={logoutUser} style={{ cursor: "pointer" }}>
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </body>
  );
}

// export default Navbar;
