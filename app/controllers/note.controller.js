const Note = require("../models/note.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const note = new Note({
      id: req.body.id,
      title: req.body.title,
      description: req.body.description
    });
  
    // Save Customer in the database
    Note.create(note, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
  };

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Note.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
  };

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.noteId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.noteId
          });
        }
      } else res.send(data);
    });
  };

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    
    Note.updateById(
      req.params.noteId,
      new Note(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.noteId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Customer with id " + req.params.noteId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Note.remove(req.params.noteId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.noteId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.noteId
          });
        }
      } else res.send({ message: `Customer was deleted successfully!` });
    });
  };

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Note.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };

