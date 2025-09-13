require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Import middleware
const { authenticateToken, authorizeRoles } = require('./middleware/auth');
const { requireAuthForBuy, requireAuthForSell, validateTransactionData } = require('./middleware/transaction');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Test database connection
const db = require('./config/db');

// Test the connection
(async () => {
  try {
    await db.query('SELECT 1');
    console.log("✅ MySQL Connected...");
  } catch (err) {
    console.error("❌ MySQL Connection Error:", err);
    process.exit(1);
  }
})();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Protected routes for cart and orders
/* ============================
   CART CRUD (Protected - User specific with Buy Authentication)
============================ */
app.post("/api/cart", requireAuthForBuy, validateTransactionData(['product_id', 'quantity']), (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.userId; // Get user ID from JWT token
  
  const sql = "INSERT INTO Cart (user_id, product_id, quantity) VALUES (?,?,?)";
  db.query(sql, [user_id, product_id, quantity], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ 
        success: false,
        message: "❌ Error adding to cart", 
        error: err.message 
      });
    }
    res.json({ 
      success: true,
      message: "✅ Item added to cart!",
      user: {
        userId: user_id,
        name: req.userProfile.user_name
      }
    });
  });
});

app.get("/api/cart", requireAuthForBuy, (req, res) => {
  const user_id = req.user.userId; // Get user ID from JWT token
  
  const sql = `SELECT c.cart_id, p.product_name, p.product_price, c.quantity, (p.product_price * c.quantity) AS total
               FROM Cart c 
               JOIN Products p ON c.product_id = p.product_id 
               WHERE c.user_id=?`;
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ 
        success: false,
        message: "❌ Error fetching cart", 
        error: err.message 
      });
    }
    res.json({
      success: true,
      message: "✅ Cart retrieved successfully",
      cart: results,
      user: {
        userId: user_id,
        name: req.userProfile.user_name
      }
    });
  });
});

app.put("/api/cart/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const user_id = req.user.userId;
  
  // Ensure user can only update their own cart items
  const sql = "UPDATE Cart SET quantity=? WHERE cart_id=? AND user_id=?";
  db.query(sql, [quantity, id, user_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "❌ Error updating cart", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "❌ Cart item not found or unauthorized" });
    }
    res.json({ message: "✅ Cart Updated!" });
  });
});

app.delete("/api/cart/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const user_id = req.user.userId;
  
  // Ensure user can only delete their own cart items
  db.query("DELETE FROM Cart WHERE cart_id=? AND user_id=?", [id, user_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "❌ Error removing item from cart", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "❌ Cart item not found or unauthorized" });
    }
    res.json({ message: "🗑 Item removed from cart!" });
  });
});

/* ============================
   ORDERS CRUD (Protected - User specific with Buy Authentication)
============================ */
app.post("/api/orders", requireAuthForBuy, validateTransactionData(['total_amount', 'payment_method']), (req, res) => {
  const { serial_no, total_amount, payment_method, status = 'pending' } = req.body;
  const user_id = req.user.userId; // Get user ID from JWT token
  
  const sql =
    "INSERT INTO Orders (user_id, serial_no, total_amount, payment_method, status) VALUES (?,?,?,?,?)";
  db.query(
    sql,
    [user_id, serial_no, total_amount, payment_method, status],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ 
          success: false,
          message: "❌ Error creating order", 
          error: err.message 
        });
      }
      res.json({ 
        success: true,
        message: "✅ Order Created!",
        buyer: {
          userId: user_id,
          name: req.userProfile.user_name
        }
      });
    }
  );
});

app.get("/api/orders", requireAuthForBuy, (req, res) => {
  const user_id = req.user.userId; // Get user ID from JWT token
  
  const sql = "SELECT * FROM Orders WHERE user_id=?";
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ 
        success: false,
        message: "❌ Error fetching orders", 
        error: err.message 
      });
    }
    res.json({
      success: true,
      message: "✅ Orders retrieved successfully",
      orders: results,
      user: {
        userId: user_id,
        name: req.userProfile.user_name
      }
    });
  });
});

// Admin route to get all orders
app.get("/api/orders/all", authenticateToken, authorizeRoles('admin'), (req, res) => {
  const sql = `SELECT o.*, u.user_name, u.user_email 
               FROM Orders o 
               JOIN Users u ON o.user_id = u.user_id 
               ORDER BY o.created_at DESC`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "❌ Error fetching all orders", error: err.message });
    }
    res.json(results);
  });
});

app.put("/api/orders/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const user_id = req.user.userId;
  
  // Users can only update their own orders, admins can update any order
  let sql, params;
  if (req.user.role === 'admin') {
    sql = "UPDATE Orders SET status=? WHERE order_id=?";
    params = [status, id];
  } else {
    sql = "UPDATE Orders SET status=? WHERE order_id=? AND user_id=?";
    params = [status, id, user_id];
  }
  
  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "❌ Error updating order status", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "❌ Order not found or unauthorized" });
    }
    res.json({ message: "✅ Order Status Updated!" });
  });
});

app.delete("/api/orders/:id", authenticateToken, authorizeRoles('admin'), (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Orders WHERE order_id=?", [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "❌ Error deleting order", error: err.message });
    }
    res.json({ message: "🗑 Order Deleted!" });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '❌ Something went wrong!' });
});

/* ============================
   SERVER START
============================ */
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});