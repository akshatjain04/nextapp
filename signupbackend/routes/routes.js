const express = require("express");
const router = express.Router();

// import { useRouter } from "next/router";
const signUpTemplateCopy = require("../models/SignUpModels");
const ItemTemplateCopy = require("../models/itemModel");

router.post("/signup", (request, response) => {
  console.log("****************", request.body);
  let { fullname, email, contactnumber, address } = request.body;
  fullname = fullname.trim();
  email = email.trim();
  contactnumber = contactnumber.trim();
  address = address.trim();

  console.log(
    "!!!!!!!!!!!!!!!!!!!",
    fullname,
    "--------------",
    email,
    "------------------",
    contactnumber,
    "-------------",
    address
  );

  if (fullname == "" || email == "" || contactnumber == "" || address == "") {
    response.json({
      status: "FAILED",
      message: "empty input fields",
    });
  } else if (!/^[a-zA-Z ]*$/.test(fullname)) {
    response.json({
      status: "FAILED",
      message: "Invalid Name",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    response.json({
      status: "FAILED",
      message: "Invalid Email",
    });
  } else {
    //checking if user already exists.
    signUpTemplateCopy
      .find({ email })
      .then((result) => {
        signUpTemplateCopy.find({ contactnumber }).then((resultphone) => {
          if (result.length || resultphone.length) {
            //A user already exists.
            response.json({
              status: "FAILED",
              message: "A user already exists",
            });
          } else {
            //create a new user
            const signedUpUser = new signUpTemplateCopy({
              fullname: request.body.fullname,
              email: request.body.email,
              contactnumber: request.body.contactnumber,
              address: request.body.address,
            });

            signedUpUser
              .save()
              .then((result) => {
                response.json({
                  status: "PASSED",
                  fullname: fullname,
                });
              })
              .catch((error) => {
                console.log("Error in getting the data");
                response.json({
                  status: "FAILED",
                  message: "An error occured while savit the user's account",
                });
              });
            console.log("####################", signedUpUser);
            response.json({
              status: "PASSED",
              fullname: fullname,
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
        response.json({
          status: "FAILED",
          message: "An error occured while checking the user",
        });
      });
  }
});
router.post("/signin", async (request, response) => {
  try {
    const email = request.body.email;
    const contactnumber = request.body.contactnumber;

    console.log(request.body);

    const useremail = await signUpTemplateCopy.findOne({ email: email });
    console.log(">>>>>>>>>>>>>", useremail);
    //const userphone = await signUpTemplateCopy.findOne({contactnumber:contactnumber});
    console.log("+++++++++++", email, "    ", contactnumber);

    if (useremail.email == email && useremail.contactnumber == contactnumber) {
      response.json(useremail);
    } else {
      response.send("invalid login details");
    }
  } catch (error) {
    response.json({ status: "FAILED", message: "Invalid login details 2 3" });
  }
});

router.post("/userprofile", async (request, response) => {
  try {
    const fullname = request.body.name;

    const useremail = await signUpTemplateCopy.findOne({ fullname: fullname });
    response.json(useremail);
  } catch (error) {
    response.json({ status: "FAILED", message: "Invalid login details 2 3" });
  }
});

router.post("/additem", (request, response) => {
  const addItem = new ItemTemplateCopy({
    name: request.body.name,
    slug: request.body.slug,
    image: request.body.image,
    availability: request.body.availability,
    labels: request.body.labels,
    owner: request.body.owner,
  });

  console.log(addItem);

  addItem
    .save()
    .then((result) => {
      response.json({
        status: "SUCCESS",
        message: "Signup Successful",
        data: result,
      });
      console.log("data is succesfully processed");
      // response.json(data)
    })
    .catch((error) => {
      console.log("Error in getting the data");
      response.json({
        status: "FAILED",
        message: "An error occured while savit the user's account",
      });
    });
});

router.post("/itempage", async (request, response) => {
  try {
    const itemname = request.body.itemname;

    const iteminfo = await ItemTemplateCopy.findOne({ slug: itemname });

    console.log(iteminfo);

    response.json(iteminfo);
  } catch (error) {
    response.json({ status: "FAILED", message: "Invalid login details 2 3" });
  }
});

router.post("/savechanges", async (request, response) => {
  try {
    const name = request.body.itemname;

    const iteminfo = await ItemTemplateCopy.findOneAndUpdate(
      { slug: name },
      {
        availability: request.body.availability,
        name: request.body.name,
        slug: request.body.slug,
        image: request.body.image,
        labels: request.body.labels,
      }
    );
    response.json(iteminfo);
  } catch (error) {
    response.json({
      status: "FAILED",
      message: "Invalid login details 2 3 7 8",
    });
  }
});

router.post("/useritem", async (request, response) => {
  try {
    const owner = request.body.owner;

    const iteminfo = await ItemTemplateCopy.find({ owner: owner });

    response.json(iteminfo);
  } catch (error) {
    response.json({ status: "FAILED", message: "Invalid login details 2 3" });
  }
});

router.post("/dashboard", async (request, response) => {
  try {
    const iteminfo = await ItemTemplateCopy.find({
      $nor: [{ slug: "add-item" }],
    }).sort({Date:-1});
    response.json(iteminfo);
  } catch (error) {
    response.json({ status: "FAILED", message: "Invalid login details 2 3" });
  }
});

router.post("/getitem", async (request, response) => {
  try {
    const name = request.body.itemname;
    const user = request.body.user;

    const iteminfo = await ItemTemplateCopy.findOneAndUpdate(
      { slug: name },
      { owner: user, availability: "not-available" }
    );

    // const iteminfo = await ItemTemplateCopy.findOne({ name: name });
    // iteminfo.availability="not-available";
    // iteminfo.owner=user;
    // iteminfo.updateOne({ availability: "not-available" });
    // iteminfo.updateOne({ owner: user });
    response.json(iteminfo);
  } catch (error) {
    response.json({ status: "FAILED", message: "Invalid login details 2 3" });
  }
});

//         router.post('/signin', (request, response) =>{
//             let {email, contactnumber} = request.body;
//   email=email.trim();
//   contactnumber=contactnumber.trim();

//   if(email=="" || contactnumber=="" ){
//     response.json({
//         status: "FAILED",
//         message:"empty input fields"
//     })
// } else {
//     signUpTemplateCopy.find({email})
//     .then(data => {
//         if(data) {
//             //User exists

//             signUpTemplateCopy.find({contactnumber}).then(result => {
//                 if(result.length)
//                 {
//                      //This user exists
//                      response.json({
//                          status:"SUCCESS",
//                          message:"Signed in successfully",
//                          data:data
//                      })
//                 } else {
//                     response.json({
//                         status:"FAILED",
//                         message:"Invalid phone number entered"
//                     })
//                 }
//             })
//             .catch(err=> {
//                 response.json({
//                 status:"FAILED",
//                 message:"An error occured while checking email and phone number"
//                 })
//             })

//         } else {
//             response.json({
//                 status:"FAILED",
//                 message:"Invalid email and phone number"
//                 })
//         }
//     })
//     .catch(err => {
//         response.json({
//             status:"FAILED",
//             message:"An error occured while checking email and phone number for existing user"
//             })
//     })
// }

//         })

module.exports = router;
// // console.log(">>>>>>>>")
// router.post('/signup', (request, response) =>{
//     // response.json({fullname:fullname});
//     console.log(">>>>>>>",request)
//     const signedUpUser = new signUpTemplateCopy({
//          fullname:request.body.fullname,
//         email:request.body.email,
//          contactnumber:request.body.contactnumber,
//           address:request.body.address
//     });
//     if(signedUpUser.fullname=="" || signedUpUser.email=="" || signedUpUser.contactnumber=="" || signedUpUser.address==""){
//         response.json({
//             status: "FAILED",
//             message:"empty input fields"
//         })
//     }
//     else {
//         signUpTemplateCopy.find({email}).then(result=>{

//         }).catch(err=>{
//             console.log(err);
//             response.json({
//                 status:"FAILED",
//                 message:""
//             })
//         })
//     }
//     signedUpUser.save()
//     .then(data=>{
//         console.log("data is succesfully processed")
//         response.json(data)
//     })
//     .catch(error =>{
//         console.log("Error in getting the data")
//         response.json(error)
//     })
// })

// router.post('/signin', (request, response) =>{

// })
