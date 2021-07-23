const sql = require("./db.js");

// constructor
const Note = function(note) {
  this.title = note.ttle;
  this.description = note.description;
};

Note.create = (newNote, result) => {
  sql.query("INSERT INTO notepad SET ?", newNote, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created note: ", { id: res.insertId, ...newNote });
    result(null, { id: res.insertId, ...newNote });
  });
};

Note.findById = (noteId, result) => {
  sql.query(`SELECT * FROM notepad WHERE id = ${noteId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found note: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Note.getAll = result => {
  sql.query("SELECT * FROM notepad", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Note.updateById = (id, note, result) => {
  sql.query(
    "UPDATE notepad SET title = ?, description = ? WHERE id = ?",
    [note.title, note.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated note: ", { id: id, ...note });
      result(null, { id: id, ...note });
    }
  );
};

Note.remove = (id, result) => {
  sql.query("DELETE FROM notepad WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted note with id: ", id);
    result(null, res);
  });
};

Note.removeAll = result => {
  sql.query("DELETE FROM notepad", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} note`);
    result(null, res);
  });
};

module.exports = Note;