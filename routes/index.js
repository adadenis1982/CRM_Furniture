const router = require('express').Router();
const { Admin } = require('../db/models');

router.get('/', async (req, res) => {
  res.render('index');
});

router.post('/', async (req, res) => {
  const { name, password } = req.body;

  const nameDB = await Admin.findOne({ where: { name } });
  const passwordDB = await Admin.findOne({ where: { password } });

  if (nameDB && passwordDB) {
    req.session.user = nameDB;

    res.status(200).json({ login: true });
  } else {
    res.status(400).json({
      message:
        'Вы ввели неверные данные',
    });
  }
});

module.exports = router;
