# EVENTFLOW

## CONCEPT

This application consists of managing events in which users can enter to register for free or paid activities.

## PROTOTYPE LINK

This is the link for my prototype in figma
[Prototype Link](https://www.figma.com/file/JOsUo69dVSGtWlJqWPVM22/EventFlow?type=design&node-id=0%3A1&mode=design&t=5Ud2LNio1VmV2SNp-1)

## DIFFERENCE TECHNOLOGIES

### Native Applications

**Advantages:**

- Optimal performance with full access to device features.
- Smooth and platform-specific user experience.
- Higher visibility on app stores.

**Disadvantages:**

- Expensive development and maintenance for multiple platforms.
- Updates require approval from app stores.

---

### Hybrid Applications

**Advantages:**

- Faster and less expensive development.
- Single code base for multiple platforms.
- Simpler and quicker updates.

**Disadvantages:**

- Performance may be inferior to native apps.
- Limited access to device features.
- Dependency on hybrid frameworks.

---

### Web Applications

**Advantages:**

- Instant access through the browser.
- Cost-effective development and maintenance.
- Cross-platform compatibility.

**Disadvantages:**

- Limited access to device features.
- Dependency on web connectivity.
- User experience may be less intuitive.

---

### Progressive Web Applications (PWA)

**Advantages:**

- Native-like experience.
- Offline access and notifications.
- Less dependence on app stores.

**Disadvantages:**

- Limited support on some devices.
- Lower visibility compared to native apps.
- Some advanced features may require specific APIs.

### USABILITY AND ACSESIBILITY

- The application features a clear and easy navigation for discovering events

- The registration and ticket purchase process is simple and fast.

- The application provides users with reminders or updates on events

- The application ensures that crucial information, such as the time, date and location of the event, is easily accessible.

- The application provides detailed information about each event, including schedules, artists/participants, and descriptions.

- The application is compatible and delivers a consistent experience across a variety of devices, including cell phones, tablets and computers

- Users can customize their profile.

- The application facilitates direct communication between attendees prior to the event

## WHAT TYPE IS MY APPLICATION

My application is a pwa application because it combines the best of native and web applications.

## TECNOLOGHY USED

The application is made with node, express and sequelize as part of the backend and the frontend is made with ionic(angular).

## DIAGRAMS

Here is the use case diagram, the entity-relationship diagram the class diagram and relational diagram

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

## SYSTEM DESCRIPTION

A user with the manager role can add users with the administrator role. The user with the manager role can unregister the user of the administrator type. He can also register locations and delete locations

The administrator user can create events, modify events and delete events. An administrator user can also send messages to users.

The client user can register in events and can also register in a municipality. In addition, the user receives notifications associated with the event in which he/she is registered and in the municipality in which he/she is registered.

## INSTALLATION MANUAL

Clone Repository, Enter Directory and Install Dependencies:

```bash
 git clone https://github.com/Aridane1/EventFlow.git
```

Install all dependencies:

```bash
 cd backend/
 npm intall

 cd backend/
 npm intall
```

Create a .env in your backend folder with your own data:

```bash
PORT=<your-port>

JWT_SECRET=<your-jwt-secret>

DB_HOST=<your-database-host>
DB_USER=<your-database-user>
DB_PASSWORD=<your-database-password>
DB_NAME=<your-database-name>

PUBLIC_KEY=<your-vapid-public-key>
PRIVATE_KEY=<your-vapid-private-key>

DB_HOST=<your-db-host>
NODE_ENV=<your-development-environments>
```

Finally run both your backend and frontend:

```bash
cd frontend/
ionic serve

cd backend/
npm start
```
