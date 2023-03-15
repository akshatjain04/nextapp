import Layout from "./Layout";
import axios from "axios";
import styles from "../styles/Home.module.css";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import NextLink from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "../helpers/";

Dashboard.getInitialProps = async ({ req, res }) => {
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

let filteredItems = [];

export default function Dashboard({ data }) {
  const router = useRouter();
  let user = data.user;
  if (user === undefined) {
    router.push("/");
  }

  const [search, setSearch] = useState("");
  const [itemsdata, setItemsdata] = useState([]);

  const itemapicall = () => {
    var config = {
      method: "post",
      url: "http://localhost:4000/app/dashboard",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    axios(config)
      .then(function (response) {
        setItemsdata(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    itemapicall();
  }, []);

  filteredItems = itemsdata.filter((item) => {
    if (item.name !== undefined) {
      return item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    }
  });

  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  if (search.length === 0) filteredItems = itemsdata;

  return (
    <Layout>
      <input
        class="searchbar"
        type="text"
        name="search"
        placeholder="Search items...."
        onChange={handleChange}
      />

      <Grid container spacing={3}>
        <Grid item md={2} key="Add Item">
          <Card className="cardsizing">
            <NextLink href={`/dashboard/item/add-item`} passHref>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image="http://cdn.onlinewebfonts.com/svg/download_414457.png"
                  title="Add Item"
                  height="300"
                ></CardMedia>
              </CardActionArea>
            </NextLink>
            <CardActions id="cardaction" style={{ justifyContent: "center"}}>
              <NextLink href={`/dashboard/item/add-item`} passHref>
                <button style={{ marginTop: "60px"}}>Add Item</button>
              </NextLink>
            </CardActions>
          </Card>
        </Grid>
        {filteredItems.map((item) => (
          <Grid item md={2} key={item.name}>
            <Card className="cardsizing">
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
              <CardActions id="cardaction">
                {item.name === undefined && (
                  <NextLink href={`/dashboard/item/${item.slug}`} passHref>
                    <button>Add Item</button>
                  </NextLink>
                )}
                {item.owner === user && (
                  <NextLink href={`/dashboard/item/${item.slug}`} passHref>
                    <button>Edit</button>
                  </NextLink>
                )}
                {item.owner !== user && item.availability === "available" && (
                  <NextLink href={`/dashboard/item/${item.slug}`} passHref>
                    <button>Get Item</button>
                  </NextLink>
                )}
                {item.owner !== user && item.availability === "not-available" && (
                  <NextLink href={`/dashboard/item/${item.slug}`} passHref>
                    <button>Interested</button>
                  </NextLink>
                )}
                {item.name && (
                  <NextLink href={`/user/${item.owner}`} passHref>
                    <button class="userProfile">
                      {item.owner[0].toUpperCase()}
                    </button>
                  </NextLink>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
