module.exports = app => {
    const note = require("../controllers/note.controller");
  
    // Create a new Customer
    app.post("/note", note.create);
  
    // Retrieve all Customers
    app.get("/note", note.getAll);
  
    // Retrieve a single Customer with customerId
    app.get("/note/:noteId", note.findOne);
  
    // Update a Customer with customerId
    app.put("/note/:noteId", note.update);
  
    // Delete a Customer with customerId
    app.delete("/note/:noteId", note.delete);
  
    // Create a new Customer
    app.delete("/note", note.deleteAll);
  };