const SensorData = require('../models/SensorData');

exports.postData = async (req, res) => {
  try {
    const { userId, temperature, heartrate, spo2 } = req.body;
    const newData = new SensorData({ userId, temperature, heartrate, spo2 });
    await newData.save();
    res.status(201).send(newData);
  } catch (error) {
    res.status(500).send({ error: 'Error saving data' });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const data = await SensorData.find({ userId: req.params.id }).sort({ timestamp: -1 });
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching data' });
  }
};

exports.getAllData = async (req, res) => {
  try {
    const data = await SensorData.find().populate('userId', 'name email').sort({ timestamp: -1 });
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching data' });
  }
};
