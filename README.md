# EVENTFLOW

## CONCEPT

This application consists of managing events in which users can enter to register for free or paid activities.

## TECNOLOGHY USED

The application is made with node, express and sequelize as part of the backend and the frontend is made with ionic(angular).

## DIAGRAMS

Here is the use case diagram, the entity-relationship diagram the class diagram and relation diagram

### RELATIONAL DIAGRAM

- USER(**ID**,username,password,email),
- EVENT(**ID**,name,description,date,location_id\*,num_tickets,price),
- LOCATION(**ID**,name),
- NOTIDICATIONMUNICIPALITY(**ID**,title,message),
- NOTIDICATIONEVENT(**ID**,title,message),
- RELATIONNOTIDICATIONMUNICIPALITY(**location_id\***,**notification_location_id\***),
- RELATIONNOTIDICATIONMUNICIPALITY(**event_id\***,**notification_event_id\***),
- SUBSCRIPTIONUSERLOCATION(**location_id\***,**user_id\***),
- SUBSCRIPTIONUSEREVENT(**event_id\***,**user_id\***),
- DEVICE(**ID\***,endpoint,keys,user_id\*)

### ENTITY-RELATIONSHIP DIAGRAM

![ENTITY-RELATIONSHIP DIAGRAM](https://github.com/Aridane1/EventFlow/blob/master/screenshots/entity_relationship_diagram.PNG)

### USE CASE DRIAGRAM

![USE CASE DIAGRAM](https://github.com/Aridane1/EventFlow/blob/master/screenshots/use_case_diagram.PNG)

### CASE DIAGRAM

![CLASS DIAGRAM](https://github.com/Aridane1/EventFlow/blob/master/screenshots/class_diagram.PNG)

## DESCRIPTION OF THE RELATIONSHIPS BETWEEN KEYS AND FIELDS

### USER

- Fields: ID (primary key), username, password, email.
- Keys: ID (primary key).

### EVENT

- Fields: ID (primary key), name, description, date, location_id (foreign key referencing LOCATION), num_tickets, price.
- Keys: ID (primary key).
- Relationships:
  - location_id (foreign key referencing LOCATION).

### LOCATION

- Fields: ID (primary key), name.
- Keys: ID (primary key).

### NOTIFICATIONMUNICIPALITY

- Fields: ID (primary key), title, message.
- Keys: ID (primary key).

### NOTIFICATIONEVENT

- Fields: ID (primary key), title, message.
- Keys: ID (primary key).

### RELATIONNOTIFICATIONMUNICIPALITY

- Fields: location_id (foreign key referencing LOCATION)(primary key), notification_location_id (foreign key referencing NOTIFICATIONMUNICIPALITY)(primary key).
- Relationships:
  - location_id (foreign key referencing LOCATION) relates to notification_location_id (foreign key referencing NOTIFICATIONMUNICIPALITY).

### RELATIONNOTIFICATIONEVENT

- Fields: event_id (foreign key referencing EVENT)(primary key), notification_event_id (foreign key referencing NOTIFICATIONEVENT)(primary key).
- Relationships:
  - event_id (foreign key referencing EVENT) relates to notification_event_id (foreign key referencing NOTIFICATIONEVENT).

### SUBSCRIPTIONUSERLOCATION

- Fields: location_id (foreign key referencing LOCATION)(primary key), user_id (foreign key referencing USER)(primary key).
- Relationships:
  - location_id (foreign key referencing LOCATION) is associated with user_id (foreign key referencing USER).

### SUBSCRIPTIONUSEREVENT

- Fields: event_id (foreign key referencing EVENT)(primary key), user_id (foreign key referencing USER)(primary key).
- Relationships:
  - event_id (foreign key referencing EVENT) is associated with user_id (foreign key referencing USER).

### DEVICE

- Fields: ID (primary key), endpoint, keys, user_id (foreign key referencing USER).
- Keys: ID (primary key).
- Relationships:
  - user_id (foreign key referencing USER) links to the user owning the device.
