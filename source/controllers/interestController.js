const Interests = require('../models/Interests');
const jwt = require('../auth/jwt');


const interestController = {

  // adding to interests options of the system
  addInterest(req, res) {
    const token = req.headers['jwt-token'];
    jwt.verify(token, (decoded) => {
      if (decoded.type === 1) {
        const name = req.body.name;

        // creating a new Interests instance and saving it
        const newInterest = new Interests({
          name,
        });
        newInterest.save();
        res.status(200).json({
          status: 'success',
          data: {
            name,
          },
        });
      } else {
        res.status(500).json({
          err: 'unauthorized access',
        });
      }
    });
  },
};
module.exports = interestController;
