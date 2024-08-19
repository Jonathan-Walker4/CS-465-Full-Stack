# CS 465 Module Eight Journal

## GitHub Repository
[GitHub Repository Link](https://github.com/Jonathan-Walker4/CS-465-Full-Stack)

## Architecture
In the development of the full stack web application, I employed multiple types of frontend development, including Express HTML, JavaScript, and Angular for the Single-Page Application (SPA). Express HTML and JavaScript were primarily used for server-side rendering, which is more traditional and suitable for simpler, static content. The SPA, developed using Angular, provided a dynamic and interactive user experience, enhancing the user interface by updating content without requiring a full-page reload. This approach allowed for a more seamless user experience, particularly on the administrative side of the application.

The decision to use a NoSQL MongoDB database on the backend was driven by its flexibility in handling unstructured data. MongoDB's schema-less nature allows for easier scaling and handling of diverse data types, which is ideal for a full stack application where data structures can evolve over time.

## Functionality
JSON (JavaScript Object Notation) plays a crucial role in tying together the frontend and backend development. Unlike JavaScript, which is a scripting language used for client-side logic, JSON is a lightweight data interchange format. JSON allows the seamless transfer of data between the server and client, enabling efficient communication in a full stack application. For instance, when a user submits a form on the frontend, the data is often serialized into JSON and sent to the backend via an API call.

During the development process, I refactored code to improve both functionality and efficiency. One significant refactor involved creating reusable UI components in Angular, which helped to maintain consistency across the application and reduced the amount of redundant code. This approach not only made the application easier to maintain but also improved its scalability by allowing new features to be integrated more easily.

## Testing
API testing was a critical part of the development process, particularly when dealing with request and retrieval methods. Each endpoint was tested to ensure it correctly handled different types of HTTP requests (GET, POST, PUT, DELETE). The introduction of security layers, such as JWT authentication, added complexity to the testing process. It was necessary to ensure that only authenticated users could access certain endpoints, which involved testing the security mechanisms thoroughly. This process helped in understanding the importance of securing endpoints in a full stack application and how these security measures interact with the overall functionality.

## Reflection
This course has been instrumental in helping me reach my professional goals by providing a comprehensive understanding of full stack development. Through this course, I have gained the skills necessary to effectively integrate frontend and backend technologies, enabling me to build cohesive and efficient applications. The hands-on experience with the MEAN stack (MongoDB, Express.js, Angular, Node.js) has not only expanded my technical expertise but also made me a more marketable candidate in the tech industry, particularly in roles that require full stack development expertise.

Beyond the classroom, the knowledge and skills I’ve acquired have empowered me to build my own full stack web application on my home server. This practical experience has deepened my understanding of how full stack applications operate in real-world environments and has provided me with the confidence to take on more complex projects.

Furthermore, the concepts and techniques learned in this course are directly applicable to a full stack application I am developing for the company I work for. The ability to design, develop, and deploy a robust and secure web application is invaluable in my professional role, and I am now better equipped to contribute to the success of my organization through the creation of scalable and efficient software solutions.
