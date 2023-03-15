import Link from "next/link";
let user;

export default function Main() {
  console.log(Buffer.from("bhhavya:uh5zuMXVduGDLbVu8zac").toString("base64"));
  return (
    <div>
      <div class="container1">
        <h1>Start the journey with roost!</h1>
        <div class="row-homepage">
          <div>
            <Link href="/signup">
              <a>
                <button className="sign-up-btn">SignUp</button>
              </a>
            </Link>
          </div>

          <div class="row-homepage">
            <Link href="/signin">
              <a>
                <button className="sign-up-btn">SignIn</button>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <img
        src="/roost_header.png"
        alt="roost background header"
        className="bg-img"
      />
    </div>
  );
}
