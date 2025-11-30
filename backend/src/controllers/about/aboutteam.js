const Team = require('../../models/about/aboutTeam');

// Initialize if not exists
const getOrCreateTeam = async () => {
  let team = await Team.findOne();
  if (!team) {
    team = await Team.create({ sectionSettings: {}, members: [] });
  }
  return team;
};

// Get both settings and members
exports.getTeamData = async (req, res) => {
  const team = await getOrCreateTeam();
  res.json(team);
};

// Save (add/update) a member
exports.saveMember = async (req, res) => {
  const { id, ...data } = req.body;
  const team = await getOrCreateTeam();

  let updatedMembers;
  if (id) {
    updatedMembers = team.members.map(m =>
      m.id === id ? { ...m.toObject(), ...data, id } : m
    );
  } else {
    const newMember = {
      id: Date.now().toString(),
      ...data
    };
    updatedMembers = [...team.members, newMember];
  }

  team.members = updatedMembers;
  await team.save();
  res.json({ members: team.members });
};

// Delete a member
exports.deleteMember = async (req, res) => {
  const { id } = req.params;
  const team = await getOrCreateTeam();
  team.members = team.members.filter(m => m.id !== id);
  await team.save();
  res.json({ success: true });
};

// Save section settings
exports.saveSettings = async (req, res) => {
  const team = await getOrCreateTeam();
  team.sectionSettings = req.body;
  await team.save();
  res.json(team.sectionSettings);
};
