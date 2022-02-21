const router = require('express').Router();
const { format } = require('date-fns');
const {
  Client,
  CommentAboutClient,
  Admin,
  Order,
  Furniture,
  OrderFurniture,
  CommentAboutOrder,
} = require('../db/models');

router.get('/', async (req, res) => {
  const client = await Client.findAll({ raw: true });
  const comment = await CommentAboutClient.findAll({ raw: true });
  const admin = await Admin.findAll({ raw: true });
  for (let i = 0; i < comment.length; i += 1) {
    for (let j = 0; j < admin.length; j += 1) {
      if (comment[i].admin_id === admin[j].id) {
        comment[i].auth = admin[j].name;
      }
    }
  }
  for (let i = 0; i < client.length; i += 1) {
    for (let j = 0; j < comment.length; j += 1) {
      if (client[i].id === comment[j].client_id) {
        client[i].comment = comment[j].text;
        client[i].auth = comment[j].auth;
        client[i].time = format(comment[j].createdAt, 'dd/MM/yy HH:mm:ss');
      }
    }
  }
  for (let i = 0; i < client.length; i += 1) {
    client[i].number = i + 1;
  }
  res.render('client/main', { client });
});

router.get('/new', async (req, res) => {
  res.render('client/new');
});

router.post('/new', async (req, res) => {
  const { user } = req.session;
  try {
    const client = await Client.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      address: req.body.address,
    });
    await CommentAboutClient.create({
      client_id: client.id,
      admin_id: user.id,
      text: req.body.comment,
    });
    res.status(201).json({ create: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/order/:id', async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { client_id: req.params.id },
      raw: true,
    });
    const furniture = await Furniture.findAll({ raw: true });
    const orderFurniture = await OrderFurniture.findAll({ raw: true });
    const commentAboutOrder = await CommentAboutOrder.findAll({ raw: true });
    const admin = await Admin.findAll({ raw: true });
    const client = await Client.findAll({ raw: true });
    for (let i = 0; i < orders.length; i += 1) {
      for (let j = 0; j < client.length; j += 1) {
        if (orders[i].client_id === client[j].id) {
          orders[i].name = client[j].firstname;
          orders[i].lastname = client[j].lastname;
        }
      }
    }
    for (let i = 0; i < commentAboutOrder.length; i += 1) {
      for (let j = 0; j < admin.length; j += 1) {
        if (commentAboutOrder[i].admin_id === admin[j].id) {
          commentAboutOrder[i].auth = admin[j].name;
        }
      }
    }
    for (let i = 0; i < orders.length; i += 1) {
      for (let j = 0; j < commentAboutOrder.length; j += 1) {
        if (orders[i].id === commentAboutOrder[j].order_id) {
          orders[i].com = commentAboutOrder[j].text;
          orders[i].auth = commentAboutOrder[j].auth;
          orders[i].time = format(
            commentAboutOrder[j].createdAt,
            'dd/MM/yy HH:mm:ss'
          );
        }
      }
    }
    for (let i = 0; i < orders.length; i += 1) {
      for (let j = 0; j < orderFurniture.length; j += 1) {
        if (orders[i].id === orderFurniture[j].order_id) {
          orders[i].fid = orderFurniture[j].furniture_id;
        }
      }
    }
    for (let i = 0; i < orders.length; i += 1) {
      for (let j = 0; j < furniture.length; j += 1) {
        if (orders[i].fid === furniture[j].id) {
          orders[i].type = furniture[j].type;
          orders[i].price = furniture[j].price;
          orders[i].title = furniture[j].title;
        }
      }
    }
    for (let i = 0; i < orders.length; i += 1) {
      orders[i].num = i + 1;
      orders[i].date = format(orders[i].date, 'dd/MM/yy HH:mm:ss');
    }
    res.status(200).render('client/clientOrder', {
      orders,
      name: orders[0].name,
      lastname: orders[0].lastname,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/order/edit/:id', async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id },
      raw: true,
    });
    const orderFurniture = await OrderFurniture.findOne({
      where: { order_id: req.params.id },
      raw: true,
    });
    const comment = await CommentAboutOrder.findOne({
      where: { order_id: req.params.id },
      raw: true,
    });
    const furniture = await Furniture.findOne({
      where: { id: orderFurniture.furniture_id },
      raw: true,
    });
    res
      .status(200)
      .render('client/editClientOrder', {
        order,
        comment: comment.text,
        furniture,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/order/edit/:id', async (req, res) => {
  try {
    await Order.update(
      {
        status: req.body.status,
        number: req.body.number,
        delivery_price: req.body.delivery_price,
        assembly_price: req.body.assembly_price,
      },
      { where: { id: req.body.id } }
    );
    const a = await OrderFurniture.findOne({
      where: {
        order_id: req.params.id,
      },
    });
    await Furniture.update(
      {
        type: req.body.type,
        price: req.body.price,
        title: req.body.title,
      },
      { where: { id: a.furniture_id } }
    );
    await CommentAboutOrder.update(
      {
        text: req.body.comment,
      },
      { where: { order_id: req.params.id } }
    );
    res.status(201).json({ update: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/order/:id', async (req, res) => {
  const a = await OrderFurniture.findOne({
    where: { order_id: req.params.id },
  });
  try {
    await CommentAboutOrder.destroy({ where: { order_id: req.params.id } });
    await OrderFurniture.destroy({ where: { order_id: req.params.id } });
    await Order.destroy({ where: { id: req.params.id } });
    await Furniture.destroy({ where: { id: a.furniture_id } });

    res.status(200).json({ delete: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const comment = await CommentAboutClient.findOne({
      where: { client_id: req.params.id },
      raw: true,
    });
    console.log(comment.text);
    const client = await Client.findOne({
      where: { id: req.params.id },
      raw: true,
    });
    res.status(200).render('client/edit', { client, comment: comment.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/edit/:id', async (req, res) => {
  try {
    await CommentAboutClient.update(
      { text: req.body.comment },
      { where: { client_id: req.params.id } }
    );
    await Client.update(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json({ update: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await CommentAboutClient.destroy({ where: { client_id: req.params.id } });
    await Client.destroy({ where: { id: req.params.id } });
    res.status(200).json({ delete: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
