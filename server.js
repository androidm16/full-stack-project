require('dotenv').config();

const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const User = require('./models/user');
const productRouter = require("./routes/productRouter");
const contactRoute = require("./routes/contact");

// Where MongoDB is set up to connect
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(cors())
app.use(express.json())

// API routes
app.get("/", (req, res, next) => {
    res.send({
      message: "Welcome to Siyabonga & Siyanda's API",
      user_routes: {
        user_register: {
          method: "POST",
          route: "/users",
          request_body: {
            fullname: "String",
            email: "String",
            phone_number: "String",
            password: "String",
            cart: "object",
          },
          result: {
            jwt: "String token",
          },
        },
        user_login: {
          method: "PATCH",
          route: "/users",
          request_body: {
            email: "String",
            password: "String",
          },
          result: {
            jwt: "String token",
          },
        },
        all_users: {
          method: "GET",
          route: "/users",
          result: {
            users: "Array",
          },
        },
        single_user: {
          method: "GET",
          route: "/users/:id",
          result: {
            user: "Object",
          },
        },
        update_user: {
          method: "PUT",
          request_body: {
            fullname: "String",
            email: "String",
            phone_number: "String",
            password: "String",
            img: "String *optional* (Must be hosted image. I can suggest to host on Post Image)",
            cart: "object",
          },
          route: "/users/:id",
          result: {
            user: "Object",
          },
        },
        delete_user: {
          method: "DELETE",
          route: "/users/:id",
          result: {
            message: "Object",
          },
        },
      },
      product_routes: {
        all_products: {
          method: "GET",
          route: "/products",
          headers: {
            authorization: "Bearer (JWT token)",
          },
          result: {
            product: "Array",
          },
        },
        single_product: {
          method: "GET",
          route: "/products/:id",
          headers: {
            authorization: "Bearer (JWT token)",
          },
          result: {
            product: "Object",
          },
        },
        create_product: {
          method: "POST",
          route: "/products/",
          headers: {
            authorization: "Bearer (JWT token)",
          },
          request_body: {
            title: "String",
            body: "String",
            img: "String *optional* (Must be hosted image. I can suggest to host on Post Image)",
          },
          result: {
            post: "Object",
          },
        },
        update_product: {
          method: "PUT",
          route: "/products/:id",
          headers: {
            authorization: "Bearer (JWT token)",
          },
          request_body: {
            title: "String *optional*",
            body: "String *optional*",
            img: "String *optional* (Must be hosted image. I can suggest to host on Post Image)",
          },
          result: {
            post: "Object",
          },
        },
        delete_product: {
          method: "DELETE",
          route: "/products/:id",
          result: {
            message: "Object",
          },
        },
      },
      cart_routes:{
        all_cart_items: {
          method: "GET",
          route: "/users/:id/cart",
          headers: {
            authorization: "Bearer (JWT token)",
          },
          result: {
            cart: "Array",
          },
        },
        delete_cart_item:{
          method: "DELETE",
          route: "/users/:id/cart",
          result: {
            message: "Object",
          },
        },
        update_cart:{
          method: "PUT",
          route: "/users/:id/cart",
          headers: {
            authorization: "Bearer (JWT token)",
          },
          request_body: {
            title: "String *optional*",
            body: "String *optional*",
            img: "String *optional* (Must be hosted image. I can suggest to host on product Image)",
          },
          result: {
            cart: "Object",
          },
        }
      }
    });
  });

const userRouter = require('./routes/users')
app.use('/users', userRouter)
app.use("/contact", contactRoute);
app.use("/products", productRouter);

app.set('port', process.env.port || 3050) 

app.listen(app.get('port'), server =>{
    console.info(`Server listen on port ${app.get('port')}`);
})