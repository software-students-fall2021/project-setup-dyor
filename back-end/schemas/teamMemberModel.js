const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const teamMember = mongoose.model("TeamMember", teamMemberSchema);

module.exports = teamMember;
