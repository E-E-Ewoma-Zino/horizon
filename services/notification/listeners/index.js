const benefactorListener = require("./benefactor.listener");

// The listener class helps in creating and organise the emitters which listens for an event
const event = require("events").EventEmitter;

const generalEmmiter = new event();

// activate listener
benefactorListener(generalEmmiter);

module.exports = generalEmmiter;