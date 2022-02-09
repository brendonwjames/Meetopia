const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Event, Group } = require('../../db/models');

router.get('/', asyncHandler(async (req, res) => {
    const eventList = await Event.findAll();
    return res.json(eventList);
}));

router.post('/', asyncHandler(async (req, res) => {
    const { hostId, categoryId, eventName, date, capacity } = req.body;
    const newEvent = await Event.create({ hostId, categoryId, eventName, date, capacity })
    res.json(newEvent)
}));

router.put('/:id(\\d+)', asyncHandler(async (req, res) => {
    const event = await Event.findByPk(req.params.id);
    event.hostId = req.body.hostId;
    event.venueId = req.body.venueId;
    event.categoryId = req.body.categoryId;
    event.name = req.body.name;
    event.date = req.body.date;
    event.capacity = req.body.capacity;

    await event.save();
    res.json(event);
}));

module.exports = router