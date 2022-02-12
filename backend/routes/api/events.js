const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Event, Rsvp } = require('../../db/models');

router.get('/', asyncHandler(async (req, res) => {
    const eventList = await Event.findAll();
    return res.json(eventList);
}));

router.get('/:eventId(\\d+)', asyncHandler(async (req, res) => {
    const eventId = req.params.eventId;
    const event = await Event.findByPk(eventId, {
        include: {model: Rsvp, where: {
            eventId
        }}
    });
    
    return res.json(event);
}));

router.post('/', asyncHandler(async (req, res) => {
    const { hostId, categoryId, eventName, date, capacity } = req.body;
    const newEvent = await Event.create({ hostId, categoryId, eventName, date, capacity })
    // const newRsvp = await Rsvp.findAll({where: {eventId: newEvent.id}})
    // newEvent.dataValues.Rsvp = newRsvp;
    const newRsvp = await Rsvp.create({eventId: newEvent.id, userId: hostId})
    res.json(newEvent)
}));

router.put('/:id(\\d+)', asyncHandler(async (req, res) => {
    const event = await Event.findByPk(req.params.id);
    event.hostId = req.body.hostId;
    event.categoryId = req.body.categoryId;
    event.eventName = req.body.eventName;
    event.date = req.body.date;
    event.capacity = req.body.capacity;

    await event.save();
    res.json(event);
}));

router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
    const event = await Event.findByPk(req.params.id);
    await event.destroy();
    res.json({});
}));

router.post('/rsvp', asyncHandler(async (req, res) => {
    try {const { eventId, userId } = req.body;
    const newRsvp = await Rsvp.create({ eventId, userId })
    res.json(newRsvp);
} catch (error) {
    console.log(error)
}
}));

router.delete('/rsvp', asyncHandler(async (req, res) => {
    const rsvp = await Rsvp.findByPk(req.params.id);
    await rsvp.destroy();
    res.json({});
}));

module.exports = router