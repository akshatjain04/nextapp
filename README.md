## About Project

- Demo sample app for marketplace.
- It has donors, receivers and items
- Anyone is able to register(will be able to recieve and donate).
- For registration name, email, phone and address are required.
- Registered user will be able to add and recieve items.
- Item will have a name, description, labels and picture.
- Search page allows user to search based on the labels and name of the items.
- Donor(Owner of the item) can mark an item as “Not Available”(In which case te item will stll be dispkatyed but another user will not be able to recieve it.)

## Techstack

- HTML, CSS, Javascript & NextJS framework for the Front-end and material-ui for the styles.
- ReactJS for server-side rendering.
- Mongo database for managing user & items data.

## Getting Started

### Using docker compose

Step1: Run docker-compose.yaml:

      docker-compose up -d
      
Step2: Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Using dockerfile

Step1: Create docker network 

      docker network create nextapp

Step2: Build the dockerfile for backend

      cd signupbackend
      docker build --no-cache -t backend:1.0

Step3: Build the dockerfile for frontend

      cd ..
      docker build --no-cache -t frontend:1.0

Step4: run frontend image at port 3000

      docker run  -p 3000:3000 --name frontapp --net nextapp frontend:1.0

Step5: run backend image at port 4000

      docker run  -p 4000:4000 --name backapp --net nextapp backend:1.0

Step6: Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
      
### Using npm command

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Second, for connecting this app to the mongodb server

```bash
cd signupbackend
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Home Page

It will open the Home page where the user has an option for signup and signin.

## Dashboard

After registering as a new user or signing in as an existing user, You will go to the dashboard page which contains a list of the items displaying their pictures, name and availability status. If you are the owner of the particular item then you will be able to edit the details of that item else it will show "Get Item" if the item is available or "Interested" if the item is not-available.

## Add-Item

In dashboard page if you click on "Add Item" button, this will open a new page where the user can add the item in the Item database list by providing Name, Slug, Labels, Image URL & Availability status and the particular item will be shown on top in the dashboard page because of the sorting according to the Date & Time.

## Profile

Whenever the user clicks on his/her profile or profile of other item's owner He/She will be redirected to the profile page where the user can see the contact details of the person and also the items he/she owns.
