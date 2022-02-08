const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Event, Group } = require('../../db/models');

router.get('/', asyncHandler(async (req, res) => {
    const eventList = await Event.findAll()
    console.log(eventList, "********")
    return res.json(eventList)
}))

router.post('/', asyncHandler(async (req, res) => {
    const { hostId, categoryId, eventName, date, capacity } = req.body;
    const newEvent = await Event.create({ hostId, categoryId, eventName, date, capacity })
    res.json(newEvent)
}))


module.exports = router