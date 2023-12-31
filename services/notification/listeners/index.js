const benefactorListener = require("./benefactor.listener");
const userOTP = require("./userOTP");

// The listener class helps in creating and organise the emitters which listens for an event
const event = require("events").EventEmitter;

const generalEmmiter = new event();

// activate listener
benefactorListener(generalEmmiter);
userOTP(generalEmmiter);

module.exports = generalEmmiter;