const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Lakshmi@2005", // 🔑 change this
  database: "campusdeals",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Error:", err);
    process.exit(1);
  }
  console.log("✅ MySQL Connected...");
});

/* ============================
   USERS CRUD
============================ */
app.post("/users", (req, res) => {
  const {
    user_name,
    user_email,
    user_password,
    role,
    user_phone,
    user_studyyear,
    user_branch,
    user_section,
    user_residency,
    payment_received,
    amount_given
  } = req.body;

  const sql =
    "INSERT INTO Users (user_name, user_email, user_password, role, user_phone, user_studyyear, user_branch, user_section, user_residency, payment_received, amount_given) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

  db.query(
    sql,
    [
      user_name,
      user_email,
      user_password,
      role,
      user_phone,
      user_studyyear,
      user_branch,
      user_section,
      user_residency,
      payment_received,
      amount_given
    ],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("❌ Error creating user");
      }
      res.send("✅ User Created!");
    }
  );
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM Users", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("❌ Error fetching users");
    }
    res.json(results);
  });
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { user_phone } = req.body;
  const sql = "UPDATE Users SET user_phone=? WHERE user_id=?";
  db.query(sql, [user_phone, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("❌ Error updating user");
    }
    res.send("✅ User Updated!");
  });
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Users WHERE user_id=?", [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("❌ Error deleting user");
    }
    res.send("🗑 User Deleted!");
  });
});

/* ============================
   PRODUCTS CRUD
============================ */
app.post("/products", (req, res) => {
  const {
    product_name,
    product_variant,
    product_code,
    product_price,
    product_images,
    quantity,
  } = req.body;

  const sql =
    "INSERT INTO Products (product_name, product_variant, product_code, product_price, product_images, quantity) VALUES (?,?,?,?,?,?)";

  db.query(
    sql,
    [
      product_name,
      product_variant,
      product_code,
      product_price,
      product_images,
      quantity,
    ],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("❌ Error adding product");
      }
      res.send("✅ Product Added!");
    }
  );
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM Products", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("❌ Error fetching products");
    }
    res.json(results);
  });
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { product_price, quantity } = req.body;
  const sql =
    "UPDATE Products SET product_price=?, quantity=? WHERE product_id=?";
  db.query(sql, [product_price, quantity, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("❌ Error updating product");
    }
    res.send("✅ Product Updated!");
  });
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Products WHERE product_id=?", [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("❌ Error deleting product");
    }
    res.send("🗑 Product Deleted!");
  });
});

/* ============================
   CART CRUD
============================ */
app.post("/cart", (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  const sql = "INSERT INTO Cart (user_id, product_id, quantity) VALUES (?,?,?)";
  db.query(sql, [user_id, product_id, quantity], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("❌ Error adding to cart");
    }
    res.send("✅ Item added to cart!");
  });
});

app.get("/cart/:user_id", (req, res) => {
  const { user_id } = req.params;
  const sql = `SELECT c.cart_id, p.product_name, p.product_price, c.quantity, (p.product_price * c.quantity) AS total
               FROM Cart c 
               JOIN Products p ON c.product_id = p.product_id 
               WHERE c.user_id=?`;
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("❌ Error fetching cart");
    }
    res.json(results);
  });
});

app.put("/cart/:id", (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const sql = "UPDATE Cart SET quantity=? WHERE cart_id=?";
  db.query(sql, [quantity, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("❌ Error updating cart");
    }
    res.send("✅ Cart Updated!");
  });
});

app.delete("/cart/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Cart WHERE cart_id=?", [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("❌ Error removing item from cart");
    }
    res.send("🗑 Item removed from cart!");
  });
});

/* ============================
   ORDERS CRUD
============================ */
app.post("/orders", (req, res) => {
  const { user_id, serial_no, total_amount, payment_method, status } = req.body;
  const sql =
    "INSERT INTO Orders (user_id, serial_no, total_amount, payment_method, status) VALUES (?,?,?,?,?)";
  db.query(
    sql,
    [user_id, serial_no, total_amount, payment_method, status],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("❌ Error creating order");
      }
      res.send("✅ Order Created!");
    }
  );
});

app.get("/orders/:user_id", (req, res) => {
  const { user_id } = req.params;
  const sql = "SELECT * FROM Orders WHERE user_id=?";
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("❌ Error fetching orders");
    }
    res.json(results);
  });
});

app.put("/orders/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sql = "UPDATE Orders SET status=? WHERE order_id=?";
  db.query(sql, [status, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("❌ Error updating order status");
    }
    res.send("✅ Order Status Updated!");
  });
});

app.delete("/orders/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Orders WHERE order_id=?", [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("❌ Error deleting order");
    }
    res.send("🗑 Order Deleted!");
  });
});

/* ============================
   SERVER START
============================ */
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});