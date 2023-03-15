import React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { parseCookies } from "../../../helpers";

var axios = require("axios");
var qs = require("qs");

ItemPage.getInitialProps = async ({ req, res }) => {
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

export default function ItemPage({ data }) {
  let user = data.user;
  const router = useRouter();
  if (user === undefined) {
    router.push("/");
  }

  const { itemname } = router.query;
  let flabels = "";

  const addItem = async (event) => {
    event.preventDefault();
    var labels = [];
    var label = "";

    for (var i = 0; i < event.target.labels.value.length; i++) {
      if (event.target.labels.value[i] === ",") {
        labels.push(label);
        label = "";
        continue;
      }
      label += event.target.labels.value[i];
    }

    labels.push(label);
    var data = qs.stringify({
      name: `${event.target.name.value}`,
      slug: `${event.target.slug.value}`,
      image: `${event.target.imageurl.value}`,
      availability: `${event.target.availability.value}`,
      labels: `${labels}`,
      owner: `${user}`,
    });
    var config = {
      method: "post",
      url: "http://localhost:4000/app/additem",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        router.push("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const saveChanges = (event) => {
    event.preventDefault();

    var labels = [];
    var label = "";

    for (var i = 0; i < event.target.labels.value.length; i++) {
      if (event.target.labels.value[i] === ",") {
        labels.push(label);
        label = "";
        continue;
      }
      label += event.target.labels.value[i];
    }

    labels.push(label);

    var data = qs.stringify({
      name: `${event.target.name.value}`,
      slug: `${event.target.slug.value}`,
      image: `${event.target.imageurl.value}`,
      availability: `${event.target.availability.value}`,
      labels: `${labels}`,
      itemname: `${itemname}`,
    });

    var config = {
      method: "post",
      url: "http://localhost:4000/app/savechanges",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        router.push("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getItems = async (event) => {
    event.preventDefault();

    var data = qs.stringify({
      itemname: `${event.target.slug.value}`,
      user: `${user}`,
    });

    console.log(data);

    var config = {
      method: "post",
      url: "http://localhost:4000/app/getitem",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        router.push("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  var data = qs.stringify({
    itemname: `${itemname}`,
  });

  var config = {
    method: "post",
    url: "http://localhost:4000/app/itempage",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response);

      const item = response.data;

      if (item.name !== undefined) {
        for (var i = 0; i < item.labels.length; i++) {
          if (i === item.labels.length - 1) {
            flabels += item.labels[i];
          } else {
            flabels += item.labels[i] + ",";
          }
        }
      }

      document.getElementById("image").src = `${item.image}`;

      if (item.name !== undefined) {
        document.getElementById("imageurl").defaultValue = `${item.image}`;
        document.getElementById("slug").defaultValue = `${item.slug}`;
        document.getElementById("name").defaultValue = `${item.name}`;
        document.getElementById("labels").defaultValue = `${flabels}`;
      }

      if (item.owner !== user && item.name !== undefined) {
        document.getElementById("imageurl").readOnly = true;
        document.getElementById("slug").readOnly = true;
        document.getElementById("name").readOnly = true;
        document.getElementById("labels").readOnly = true;
      }

      if (item.availability === "available") {
        document.getElementById("available").checked = true;
        if (item.owner !== user) {
          document.getElementById("not-available").disabled = true;
        }
      } else if (item.availability === "not-available") {
        document.getElementById("not-available").checked = true;
        if (item.owner !== user) {
          document.getElementById("available").disabled = true;
        }
      }

      if (item.owner === user) {
        document.getElementById("changes").innerHTML = "Save";
        document.getElementById("addform").onsubmit = saveChanges;
      } else if (item.owner !== user && item.availability === "available") {
        document.getElementById("changes").innerHTML = "GetItem";
        document.getElementById("addform").onsubmit = getItems;
      } else if (item.owner !== user && item.availability === "not-available") {
        document.getElementById("changes").innerHTML = "Interested";
      } else if (item.name === undefined) {
        document.getElementById("changes").innerHTML = "Save";
        document.getElementById("addform").onsubmit = addItem;
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <form id='addform'>
      <div class='addimage'>
        <img id='image'></img>
        <div class='text'>
          <label for='imageurl'>Item Image</label>
          <input
            type='text'
            id='imageurl'
            name='imageurl'
            placeholder='Item image..'
            required
          />
        </div>
      </div>

      <div class='addinfo'>
        <div>
          <label for='name'>Item Name</label>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Item name..'
            required
          />
        </div>

        <div>
          <label for='slug'>Slug</label>
          <input
            type='text'
            id='slug'
            name='slug'
            placeholder='Item slug..'
            required
          />
        </div>
        <div>
          <label for='labels'>Labels</label>
          <input
            type='text'
            id='labels'
            name='labels'
            placeholder='Item labels..'
          />
        </div>
        <div class='availability'>
          <input
            type='radio'
            id='available'
            name='availability'
            value='available'
          />
          <label for='available'>Available</label>

          <input
            type='radio'
            id='not-available'
            name='availability'
            value='not-available'
          />
          <label for='not-available'>Not-Available</label>
        </div>
        <div class='cardaction'>
          <button id='changes'></button>
          <NextLink href='/dashboard' passHref>
            <button>Back</button>
          </NextLink>
        </div>
      </div>
    </form>
  );
}
