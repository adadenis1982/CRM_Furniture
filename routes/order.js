const router = require('express').Router();
const { format } = require('date-fns');
const {
  Order,
  Furniture,
  OrderFurniture,
  CommentAboutOrder,
  Client,
  Admin,
} = require('../db/models');

router.get('/', async (req, res) => {
  const orders = await Order.findAll({ raw: true });
  const furniture = await Furniture.findAll({ raw: true });
  const orderFurniture = await OrderFurniture.findAll({ raw: true });
  const commentAboutOrder = await CommentAboutOrder.findAll({ raw: true });
  const admin = await Admin.findAll({ raw: true });
  const client = await Client.findAll({ raw: true });
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
    for (let j = 0; j < client.length; j += 1) {
      if (orders[i].client_id === client[j].id) {
        orders[i].firstname = client[j].firstname;
        orders[i].lastname = client[j].lastname;
        orders[i].email = client[j].email;
      }
    }
  }
  for (let i = 0; i < orders.length; i += 1) {
    orders[i].num = i + 1;
    orders[i].date = format(orders[i].date, 'dd/MM/yy HH:mm:ss');
  }
  res.render('order/order', { orders });
});

router.get('/new', async (req, res) => {
  res.render('order/new');
});

router.post('/new', async (req, res) => {
  const { user } = req.session;
  try {
    const client = await Client.findOne({
      where: { email: req.body.email },
      raw: true,
    });
    const order = await Order.create({
      client_id: client.id,
      status: req.body.status,
      number: req.body.number,
      delivery_price: req.body.delivery_price,
      assembly_price: req.body.assembly_price,
      date: new Date(),
    });
    const b = await Furniture.create({
      type: req.body.type,
      price: req.body.price,
      title: req.body.title,
    });
    const a = await CommentAboutOrder.create({
      order_id: order.id,
      admin_id: user.id,
      text: req.body.com,
    });

    const c = await OrderFurniture.create({
      order_id: order.id,
      furniture_id: b.id,
    });
    res.status(201).json({ create: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/edit/:id', async (req, res) => {
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
      .render('order/edit', { order, comment: comment.text, furniture });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/edit/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

module.exports = router;
