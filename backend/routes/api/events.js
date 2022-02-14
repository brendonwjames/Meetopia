const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check, body } = require('express-validator');
const { Event, Rsvp } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const validateEvent = [
    check('eventName')
        .exists({ checkFalsy: true })
        .withMessage('Event needs a name!')
        .isLength({ max: 200 })
        .withMessage('Event name must be shorter! (200 characters max)'),
    check('date')
        .isAfter(`${new Date()}`)
        .withMessage('Date must be set in the future.'),
    check('capacity')
        .isInt({ min: 1 })
        .withMessage('Capacity must be greater than 0.'),
    handleValidationErrors
];



router.get('/', asyncHandler(async (req, res) => {
    const eventList = await Event.findAll({include: {
        model: Rsvp
    }});
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

router.post('/', validateEvent, asyncHandler(async (req, res) => {
    const { hostId, categoryId, eventName, date, capacity } = req.body;
    const newEvent = await Event.create({ hostId, categoryId, eventName, date, capacity })
    // const newRsvp = await Rsvp.findAll({where: {eventId: newEvent.id}})
    // newEvent.dataValues.Rsvp = newRsvp;
    const newRsvp = await Rsvp.create({eventId: newEvent.id, userId: hostId})
    res.json(newEvent)
}));

router.put('/:id(\\d+)', validateEvent, asyncHandler(async (req, res) => {
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

router.delete(`/rsvp`, asyncHandler(async (req, res) => {
    try {
    const { rsvpEvent, rsvpUser } = req.body;
    console.log('RSVPEVENT:', rsvpEvent, 'RSVPUSER:', rsvpUser);
    const rsvp = await Rsvp.findOne({
        where: { eventId: rsvpEvent, userId: rsvpUser } });
    await rsvp.destroy()
    return res.json('success!');
} catch(error) {
    console.log(error)
}
}));

module.exports = router