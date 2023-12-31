# EVENTFLOW

## CONCEPT

EventFlow is designed as a comprehensive platform to streamline event management, enabling users to explore, register, and participate in diverse activities, whether free or paid. Its primary goal is to provide an intuitive and efficient experience for both organizers and participants.

## PROTOTYPE LINK

Explore the Figma prototype here: [Prototype Link](https://www.figma.com/file/JOsUo69dVSGtWlJqWPVM22/EventFlow?type=design&node-id=0%3A1&mode=design&t=5Ud2LNio1VmV2SNp-1)

## DIFFERENT TECHNOLOGIES

### Native Applications

**Advantages:**

- Optimal performance with full access to device features.
- Smooth, platform-specific user experience.
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

## USERS REQUIREMENTS

- **R1. Platform**

  - _R1.1._ The events application will be designed for both computers and mobile devices.

- **R2. User Authentication Required**

- **R3. Three User Types**

  - _R3.1._ Individuals with the manager role
    - _R3.1.1._ They can create or deactivate administrators.
    - _R3.1.2._ They can create or delete locations.
  - _R3.2._ Individuals with the admin role
    - _R3.2.1._ They can create, modify, and delete events.
    - _R3.2.2._ They can send notifications to events or locations.
  - _R3.3._ Individuals with the customer role
    - _R3.3.1._ They can view all events.
    - _R3.3.2._ They can subscribe to any event.
    - _R3.3.3._ They can view notifications.
    - _R3.3.4._ They can subscribe to locations.

- **R4. In case of a database access issue, an attempt will be made to provide the end user with specific information about the "concrete" origin of the problem.**

## USABILITY AND ACCESSIBILITY

- Clear and easy navigation for discovering events.

  ![EASY NAVIGATION](https://github.com/Aridane1/EventFlow/blob/master/screenshots/easy_navigation.PNG)

- Simple and fast registration and ticket purchase process.

  ![REGISTRATION EVENT](https://github.com/Aridane1/EventFlow/blob/master/screenshots/register_event.PNG)

- Reminders and updates on events.

  ![REMINDERS EVENTS](https://github.com/Aridane1/EventFlow/blob/master/screenshots/reminders_events.PNG)

- Detailed information on each event, including schedules, etc.

  ![DEATILED INFORMATION EVENT](https://github.com/Aridane1/EventFlow/blob/master/screenshots/detailed_information.PNG)

- Compatibility and consistent experience across various devices.

  ![RESPONSIVE](https://github.com/Aridane1/EventFlow/blob/master/screenshots/responsive.PNG)

- Customizable user profiles.

  ![CUSTOMIZABLE PROFILES](https://github.com/Aridane1/EventFlow/blob/master/screenshots/button_dark_mode.PNG)
  ![CUSTOMIZABLE PROFILES](https://github.com/Aridane1/EventFlow/blob/master/screenshots/dark_mode.PNG)

- Tabulation and keyboard navigation

  ![NAVIGATION TAB](https://github.com/Aridane1/EventFlow/blob/master/screenshots/tab_nav.PNG)

- Large and intuitive icons

  ![INTUITIVE ICONS](https://github.com/Aridane1/EventFlow/blob/master/screenshots/icons.PNG)

- Interactive elements like a carousel

  ![ITERACTIVE ELEMENTS](https://github.com/Aridane1/EventFlow/blob/master/screenshots/carousel.PNG)

- Encrypted password in the data base

  ![ENCRYPTED PASSWORD](https://github.com/Aridane1/EventFlow/blob/master/screenshots/encrypted_password.PNG)

- Have a token in the localStorage

  ![NAVIGATION TAB](https://github.com/Aridane1/EventFlow/blob/master/screenshots/token.PNG)

## APPLICATION TYPE

EventFlow is a PWA app, combining the strengths of native and web apps. It ensures accessibility from multiple devices, push notifications, and development based on web standards, providing a responsive design for both mobile and desktop.

## TECHNOLOGY USED

The application's backend is developed using Node.js and Express, with Sequelize handling database operations. On the frontend, Ionic with Angular is used for the mobile application, and Tailwind CSS is employed for streamlined and utility-first styling.

## DIAGRAMS

Explore the use case diagram, entity-relationship diagram, class diagram, and relational diagram below:

### RELATIONAL DIAGRAM

- USER(**ID**, username, password, email),
- EVENT(**ID**, name, description, date, location_id\*, num_tickets, price),
- LOCATION(**ID**, name),
- NOTIFICATIONMUNICIPALITY(**ID**, title, message),
- NOTIFICATIONEVENT(**ID**, title, message),
- RELATIONNOTIFICATIONMUNICIPALITY(**location_id\***, **notification_location_id\***),
- RELATIONNOTIFICATIONMUNICIPALITY(**event_id\***, **notification_event_id\***),
- SUBSCRIPTIONUSERLOCATION(**location_id\***, **user_id\***),
- SUBSCRIPTIONUSEREVENT(**event_id\***, **user_id\***),
- DEVICE(**ID\***, endpoint, keys, user_id\*)

### ENTITY-RELATIONSHIP DIAGRAM

![ENTITY-RELATIONSHIP DIAGRAM](https://github.com/Aridane1/EventFlow/blob/master/screenshots/entity_relationship_diagram.PNG)

### USE CASE DIAGRAM

![USE CASE DIAGRAM](https://github.com/Aridane1/EventFlow/blob/master/screenshots/use_case_diagram.PNG)

### CLASS DIAGRAM

![CLASS DIAGRAM](https://github.com/Aridane1/EventFlow/blob/master/screenshots/class_diagram.PNG)

## DESCRIPTION OF RELATIONSHIPS BETWEEN KEYS AND FIELDS

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

A user with the manager role can add users with the administrator role. The user with the manager role can unregister the user of the administrator type. He can also register locations and delete locations.

The administrator user can create events, modify events, and delete events. An administrator user can also send messages to users.

The client user can register in events and can also register in a municipality. In addition, the user receives notifications associated with the event in which he/she is registered and in the municipality in which he/she is registered.

## METHODOLOGY USED

1. **Data Model Development:**

   - Created the entity-relationship diagram, use case diagram, and case diagram as part of the foundational data model.

2. **Prototype Design in Figma:**

   - Developed the application prototype using Figma, ensuring a comprehensive visualization of the user interface.

3. **Backend Implementation:**

   - Initiated the backend development by implementing related database tables to support application functionalities.

4. **Functionality Testing with Postman:**

   - Checked and verified the backend functionalities using Postman to ensure proper integration and functionality.

5. **Frontend Development:**

   - Began frontend development, incorporating the backend functionalities into the user interface for a seamless user experience.

6. **User Authentication Implementation:**

   - Implemented user authentication in the backend to enhance security measures.

7. **Frontend Integration of User Authentication:**
   - Integrated user authentication features into the frontend to establish a secure and user-friendly environment.

Upon completing each phase of the methodology, thorough testing and validation were performed to ensure the reliability and effectiveness of the implemented components.

## DIFERENCES OF TECHNOLOGY

### Ionic (Angular) - Frontend for Hybrid Mobile Applications:

#### Advantages:

1. **Rapid Development:** Ionic allows fast development of mobile applications using standard web technologies such as HTML, CSS, and JavaScript.
2. **Cross-Platform:** Applications developed with Ionic can run on multiple platforms like iOS and Android, saving time and effort in development.
3. **Integration with Angular:** Ionic integrates well with Angular, making it easy to build mobile applications with the structure of a robust framework like Angular.

#### Disadvantages:

1. **Performance:** Although it has improved over time, Ionic applications may not perform as well as native applications, especially for graphics-intensive applications.
2. **Browser Dependency:** Ionic applications depend on the device's WebView, which can affect performance and the user experience.

### React - Frontend for Web Applications:

#### Advantages:

1. **Virtual DOM:** React uses a Virtual DOM to improve performance by minimizing updates to the actual DOM, resulting in a smoother user experience.
2. **Componentization:** The component-based architecture facilitates code reuse and project maintainability.
3. **Large Community and Ecosystem:** React has a vast community of developers and a wealth of libraries and tools available.

#### Disadvantages:

1. **Initial Learning Curve:** There may be an initial learning curve, especially for those new to the component paradigm and one-way data flow.
2. **Additional Tools:** For more advanced development, it's sometimes necessary to integrate additional tools and libraries, which can increase project complexity.

### Express (Node.js) - Backend:

#### Advantages:

1. **Fast and Lightweight:** Express is known for being fast and lightweight, making it suitable for applications that require quick execution.
2. **Strong Middleware Support:** It facilitates the integration of middleware for additional functionalities, such as authentication, compression, etc.
3. **Flexible API:** Allows the construction of flexible and straightforward RESTful APIs.

#### Disadvantages:

1. **Not a Complete Solution:** Express is a minimalist web framework and does not provide all the "out-of-the-box" features that some larger frameworks might have.
2. **Scalability:** Although it can handle substantial loads, for massive applications, it may require more effort in terms of configuration and scalability management.

### Laravel (PHP) - Backend:

#### Advantages:

1. **Elegant Syntax:** Laravel provides a clear and elegant syntax that facilitates writing clean and understandable code.
2. **Eloquent ORM:** Facilitates interaction with the database through an intuitive and powerful ORM.
3. **Artisan CLI:** Offers a powerful command-line interface for common tasks and automatic code generation.

#### Disadvantages:

1. **Less Focus on Real-Time:** Although Laravel is suitable for traditional web applications, it may not be the best choice for intensive real-time functionalities.
2. **Requires PHP Knowledge:** If you are not familiar with PHP, there may be a learning curve to start working with Laravel.

### Ruby on Rails - Backend:

#### Advantages:

1. **Convention over Configuration:** Rails follows the principle of "Convention over Configuration," providing sensible default configurations that speed up development.
2. **Active Record:** Similar to Eloquent in Laravel, Active Record in Rails facilitates database operations and record manipulation.
3. **Scaffolding:** Rails offers code generation tools (scaffolding) that accelerate prototype development.

#### Disadvantages:

1. **Learning Curve:** There may be an initial learning curve, especially if you are new to Ruby and the Rails development approach.
2. **Flexibility vs. Convention:** While convention over configuration is an advantage, there may be situations where flexibility is limited due to the conventions established by the framework.

## INSTALLATION MANUAL

1. Clone Repository, Enter Directory, and Install Dependencies:

   ```bash
   git clone https://github.com/Aridane1/EventFlow.git
   ```

2. Install all dependencies:

   ```bash
   cd backend/
   npm install

   cd frontend/
   npm install
   ```

3. Create a .env file in your backend folder with your own data:

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

4. Finally, run both your backend and frontend:

   ```bash
   cd frontend/
   ionic serve

   cd backend/
   npm start
   ```

## CONCLUSION

Throughout this event management project, I've solidified crucial skills in Full Stack development. Leveraging Node.js, Express, and Sequelize in the backend, I successfully built an efficient server and handled database operations effectively.

On the frontend, the combination of Ionic with Angular provided the necessary tools to develop an engaging and functional mobile application. The inclusion of Tailwind CSS streamlined the styling process, allowing me to focus on functionality.

In summary, this project not only strengthened my technical skills but also underscored the importance of choosing the right tools for each task, providing me with a more comprehensive understanding of real-world software development.

## RESOURCES

- Node.js: [Node.js Official Website](https://nodejs.org/)
- Express: [Express.js Official Website](https://expressjs.com/)
- Sequelize: [Sequelize Official Website](https://sequelize.org/)
- Ionic: [Ionic Framework Official Website](https://ionicframework.com/)
- Angular: [Angular Official Website](https://angular.io/)
- Tailwind CSS: [Tailwind CSS Official Website](https://tailwindcss.com/)
