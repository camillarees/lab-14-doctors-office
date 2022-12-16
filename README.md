# lab-14-doctors-office

## Authors: Camilla Rees and Mandela Steele-Dadzie

## Version: 1.0.0

## Deployment and Documentation
[Deployed Server on Render]()
![Whiteboard]()

## Overview
Doctor's Office Service Desk - This system simulates a doctor's office service desk where doctors can schedule appointments with patients, alert the doctor when the patient is ready to be seen, and receive a notification when they've completed the appointment.

Additionally, this app simulates a patient receiving a their appointment information from a Queue. Should many patients be seen when the doctor is not currently connected to their dashboard, the doctor should be guaranteed to receive “appointment completion” notifications from the Queue system.

## How it Works / Key Features

- A Global Event Pool Module is implemented that exports a single EventEmitter from the Node JS module

- A Module for Managing Global Package Events is implemented that listens to ALL events in the Event Pool and logs a timestamp and the payload of every event

- A Module for Managing Doctor Events is implemented that, when triggered, simulates a scheduled appointment event for the specific doctor to the Global Event Pool and emits a notification when the patient is ready to be seen to the global event pool and sends a appointment information payload to the doctor.

- A Module for Managing Patient Events is implemented that listens for a scheduled appointment event from the Global Event Pool and responds by logging a message to the console, emitting an "patient is ready" event to the Global Event Pool with the appointment payload, logging a confirmation message to the console, and emitting a appointment completed event to the Global Event Pool with the appointment payload

- A Module that guarantees that payloads from events are delivered to any Module that is listening for specific events. This Module facilitates storing of payloads Server side and removing them when received by clients.

- A feature that keeps a log of payloads that reach our system, organized by doctor and event type. Payloads are “published” to the appropriate Clients for the appropriate events.

- Client Doctor Applications used by doctors, subscribe to appropriate Doctor Queues so that they can be alerted when an appointment is completed.

- The Client can ask for all undelivered messages from a particalur Server Queue.
When a Client receives a message, it will need to let the hub server know that it was received.

## Architecture
Express
Socket

## Change Log
- [PR 1]()

## Credit and Collaborations
- [401n49 MessageClient Demo Code](https://github.com/codefellows/seattle-code-javascript-401d49/tree/main/class-13/demo-with-message-client)
- [401n49 Socket Demo Code](https://github.com/codefellows/seattle-code-javascript-401d49/tree/main/class-12/live-demo/code-review)