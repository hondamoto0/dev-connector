const User = require("../models/User");
const Profile = require("../models/Profile");

exports.deleteUser = async (req, res) => {
  try {
    // remove posts

    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // remove user
    await User.findOneAndRemove({ _id: req.user.id });
    return res.json({ msg: "User Deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience = profile.experience.filter(
      item => item.id !== req.params.exp_id
    );
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

// const profile = await Profile.findOne({ user: req.user.id });
// const removeIndex = profile.experience
//   .map(item => item.id)
//   .indexOf(req.params.exp_id);
// profile.experience.splice(removeIndex, 1);
// await profile.save();
// res.json(profile);
