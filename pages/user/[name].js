import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { NavigateBeforeOutlined } from "@material-ui/icons";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { parseCookies } from "../../helpers";
var axios = require("axios");
var qs = require("qs");

UserProfile.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);

  if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: "/" });
      res.end();
    }
  }

  return {
    data: data && data,
  };
};

export default function UserProfile({ data }) {
  const router = useRouter();
  let user = data.user;
  if (user === undefined) {
    router.push("/");
  }

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [itemData, setItemdata] = useState([]);
  const { name } = router.query;

  if (fullname === "") {
    var data = qs.stringify({
      name: `${name}`,
    });
    var config = {
      method: "post",
      url: "http://localhost:4000/app/userprofile",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setFullname(response.data.fullname);
        setEmail(response.data.email);
        setContactnumber(response.data.contactnumber);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (itemData.length === 0) {
    var data1 = qs.stringify({
      owner: `${name}`,
    });
    var config1 = {
      method: "post",
      url: "http://localhost:4000/app/useritem",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data1,
    };

    axios(config1)
      .then(function (response) {
        setItemdata(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  var initial = router.asPath[6];

  const handleScroll = (e) => {
    var navbar = document.getElementsByClassName("show");

    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      navbar[0].style.top = "0";
    } else {
      navbar[0].style.top = "-100px";
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div class="show">
        <div class="profile">
          <div class="profileImage1">{initial.toUpperCase()}</div>
          <div class="profileDetails">
            <p id="fullname" style={{ fontSize: "35px", margin: "10px" }}>
              {fullname}
            </p>
          </div>
          <NextLink href={`/dashboard`} passHref>
            <button id="dashboard1">
              <p class="dashboard1">Dashboard</p>
            </button>
          </NextLink>
        </div>
        <div style={{ backgroundColor: "white", paddingTop: "20px" }}></div>
      </div>
      <div class="sticky">
        <div class="profile">
          <div class="profileImage">{initial.toUpperCase()}</div>
          <div class="profileDetails">
            <p id="fullname">Name: {fullname}</p>
            <p id="email">Email: {email}</p>
            <p id="contactnumber">Contact Number: {contactnumber}</p>
          </div>
          <NextLink href={`/dashboard`} passHref>
            <button id="dashboard">
              <p class="dashboard">Dashboard</p>
            </button>
          </NextLink>
        </div>
      </div>
      <br></br>
      <div class="items">
        <div>Items:</div>
        <div>
          <Grid container spacing={3}>
            {itemData.map((item) => (
              <Grid item md={2} key={item.name}>
                <Card>
                  <NextLink href={`/dashboard/item/${item.slug}`} passHref>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={item.image}
                        title={item.name}
                        height="300"
                      ></CardMedia>
                      <CardContent>
                        <Typography align="center">{item.name}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </NextLink>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}
