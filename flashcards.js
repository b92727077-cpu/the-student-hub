```js
const chapterData = {
    1: {
        title: "Introduction to Software Development",

        cards: [

            {
                question: "What is SDLC?",
                answer: "Software Development Life Cycle. It is a structured process for building, testing, deploying, and maintaining software."
            },

            {
                question: "What is the primary purpose of SDLC?",
                answer: "To build high-quality software that meets user needs while controlling time, cost, and performance."
            },

            {
                question: "What is a framework in software development?",
                answer: "A reusable structure of concepts, practices, tools, components, and architecture that helps developers build software."
            },

            {
                question: "Why are software frameworks useful?",
                answer: "They improve efficiency, consistency, reuse, quality, and maintainability."
            },

            {
                question: "Give an example of a software development framework.",
                answer: "Django is an example of a web framework."
            },

            {
                question: "What are the main stages of SDLC?",
                answer: "Requirement Gathering, Design, Coding/Development, Testing, Deployment, and Maintenance."
            },

            {
                question: "What is Requirement Gathering?",
                answer: "The phase where the team identifies and collects the needs and expectations of users and stakeholders."
            },

            {
                question: "What are common activities in Requirement Gathering?",
                answer: "Interviews, surveys, observations, and reviewing documents."
            },

            {
                question: "What are functional requirements?",
                answer: "Requirements that describe what a system should do, including its functions, tasks, and services."
            },

            {
                question: "Give examples of functional requirements for a Library Management System.",
                answer: "User registration, searching or borrowing books, and inventory management."
            },

            {
                question: "What are non-functional requirements?",
                answer: "Requirements describing how well a system should perform, including quality attributes and constraints."
            },

            {
                question: "Give examples of non-functional requirements for a Library Management System.",
                answer: "Performance, reliability, and security."
            },

            {
                question: "What is the difference between functional and non-functional requirements?",
                answer: "Functional requirements describe what the system does. Non-functional requirements describe how well it performs."
            },

            {
                question: "What happens in the Design phase of SDLC?",
                answer: "The team plans how the software will look, work, and be structured."
            },

            {
                question: "Why are diagrams used in the Design phase?",
                answer: "They help show how different parts of the software connect and work together."
            },

            {
                question: "What are models in software design?",
                answer: "Representations of a software system's structure or behavior, such as interface mockups."
            },

            {
                question: "What is software architecture?",
                answer: "The overall structure of software and the way its components interact."
            },

            {
                question: "Why is the Design phase important?",
                answer: "It helps create software that is organized, usable, and aligned with user needs."
            },

            {
                question: "What is Coding/Development in SDLC?",
                answer: "The stage where programmers turn the design specifications into actual software using a programming language."
            },

            {
                question: "What is Testing in SDLC?",
                answer: "The process of checking software to find errors and verify that it works as expected."
            },

            {
                question: "What is functionality testing?",
                answer: "Testing whether the software's features work according to their specifications."
            },

            {
                question: "What is performance testing?",
                answer: "Testing how well software performs under different conditions such as heavy traffic or large amounts of data."
            },

            {
                question: "What is compatibility testing?",
                answer: "Testing whether software works correctly across different devices and operating systems."
            },

            {
                question: "What is Deployment?",
                answer: "The process of making software available for users to access and use."
            },

            {
                question: "What are common steps in Deployment?",
                answer: "Installation, configuration, and testing in the real-world environment."
            },

            {
                question: "What is installation in software deployment?",
                answer: "Putting the software on a user's device or server and setting up the required files and configurations."
            },

            {
                question: "What is configuration in software deployment?",
                answer: "Adjusting the software settings to fit particular user or organizational needs."
            },

            {
                question: "Why is real-world testing performed after deployment?",
                answer: "To verify that the software works correctly in its actual environment and interacts properly with other systems."
            },

            {
                question: "What is Maintenance in SDLC?",
                answer: "The ongoing phase where software is fixed, updated, and adapted as user needs or technology change."
            },

            {
                question: "What are software development methodologies?",
                answer: "Structured approaches that guide the planning, creation, and management of software projects."
            },

            {
                question: "Why are software process models important?",
                answer: "They provide predictability, efficiency, and integrated quality assurance throughout the SDLC."
            },

            {
                question: "What is predictability in software process models?",
                answer: "Following a defined process helps teams predict outcomes and manage risks."
            },

            {
                question: "What is efficiency in software process models?",
                answer: "Structured methodologies streamline development and reduce wasted effort."
            },

            {
                question: "What is the Waterfall Model?",
                answer: "A linear, sequential model where each phase is completed before the next begins."
            },

            {
                question: "What are the main phases of the Waterfall Model?",
                answer: "Requirements, Design, Implementation, Testing, Deployment, and Maintenance."
            },

            {
                question: "What happens in the Requirements phase?",
                answer: "The software needs are gathered and documented."
            },

            {
                question: "What happens in the Design phase?",
                answer: "The software structure and appearance are planned."
            },

            {
                question: "What happens in the Implementation phase?",
                answer: "The actual software code is written."
            },

            {
                question: "What happens in the Testing phase?",
                answer: "The software is checked for problems and bugs."
            },

            {
                question: "What happens in the Deployment phase?",
                answer: "The software is released for users."
            },

            {
                question: "What happens in the Maintenance phase?",
                answer: "Updates are made and issues found after release are fixed."
            },

            {
                question: "What are the benefits of the Waterfall Model?",
                answer: "It is simple, sequential, easy to manage, and suitable for fixed requirements."
            },

            {
                question: "What are the limitations of the Waterfall Model?",
                answer: "It is inflexible, costly to change, and risky when requirements evolve."
            },

            {
                question: "When is Waterfall suitable?",
                answer: "For smaller projects with clear, fixed requirements and unlikely changes."
            },

            {
                question: "Why can Waterfall be risky?",
                answer: "It assumes requirements are known from the start, so later changes can be costly."
            },

            {
                question: "What is Agile Methodology?",
                answer: "A flexible, adaptive approach that delivers small software parts quickly and adapts to change."
            },

            {
                question: "What are iterations or sprints in Agile?",
                answer: "Short development cycles used to deliver software parts and gather feedback."
            },

            {
                question: "What is Continuous Integration?",
                answer: "Regularly merging code changes into a central repository to detect issues early."
            },

            {
                question: "What is Test-Driven Development?",
                answer: "Writing tests before code to ensure the software behaves as expected."
            },

            {
                question: "What is Pair Programming?",
                answer: "Two developers work together, with one coding and the other reviewing in real time."
            },

            {
                question: "What are the benefits of Agile?",
                answer: "High flexibility and improved customer satisfaction through frequent working software and feedback."
            },

            {
                question: "What are the limitations of Agile?",
                answer: "Scaling can be difficult, stakeholder involvement is needed, and timelines can be less predictable."
            },

            {
                question: "What are the five phases of a project management plan?",
                answer: "Initiation, Planning, Execution, Performance Monitoring, and Project Closure."
            },

            {
                question: "What is comprehensive project planning?",
                answer: "Planning project details, including what must be done, who will do it, and how."
            },

            {
                question: "What does setting project timelines mean?",
                answer: "Deciding how long each project part will take to keep the project on track."
            },

            {
                question: "Why is cost estimation important?",
                answer: "It supports budgeting, resource allocation, and realistic project expectations."
            },

            {
                question: "What factors affect software project cost?",
                answer: "Development team, technology stack, project duration, risk management, and quality assurance."
            },

            {
                question: "How does the development team affect cost?",
                answer: "Cost depends on the number of developers, their expertise, and hourly rates."
            },

            {
                question: "How does the technology stack affect cost?",
                answer: "Technologies, languages, and tools may require different resources or specialized knowledge."
            },

            {
                question: "How does project duration affect cost?",
                answer: "Longer projects generally cost more because resources remain engaged longer."
            },

            {
                question: "What is risk management in cost estimation?",
                answer: "Identifying risks and mitigation strategies, often including contingency funds."
            },

            {
                question: "What is quality assurance cost?",
                answer: "Costs for testing, bug fixing, and ensuring software meets quality standards."
            },

            {
                question: "What is risk assessment and management?",
                answer: "Identifying risks, analyzing likelihood and impact, and developing management strategies."
            },

            {
                question: "What are the steps in risk assessment and management?",
                answer: "Identify risks, analyze risks, develop mitigation strategies, and monitor and review."
            },

            {
                question: "What happens when risks are identified?",
                answer: "Potential technical, operational, and external risks are listed."
            },

            {
                question: "What happens during risk analysis?",
                answer: "The likelihood and potential impact of each risk are evaluated."
            },

            {
                question: "What are mitigation strategies?",
                answer: "Plans that reduce a risk's likelihood or minimize its impact."
            },

            {
                question: "Why monitor and review risks?",
                answer: "To detect new risks and adjust existing strategies as needed."
            },

            {
                question: "What happens during project execution?",
                answer: "The team writes code, creates designs, and builds the software according to the plan."
            },

            {
                question: "What is quality assurance?",
                answer: "Ensuring a project meets standards and works correctly through testing, reviews, feedback, and progress checks."
            },

            {
                question: "What is graphical representation of software systems?",
                answer: "Using visual diagrams to show software structure and behavior."
            },

            {
                question: "What is UML?",
                answer: "Unified Modeling Language, a standardized way to visualize software system design."
            },

            {
                question: "Why is UML useful?",
                answer: "It helps developers and stakeholders understand, communicate, and manage software systems."
            },

            {
                question: "What is a use case diagram?",
                answer: "A visual representation of system functionality from the user's perspective."
            },

            {
                question: "What is a use case?",
                answer: "A set of interactions between an actor and a system to achieve a specific goal."
            },

            {
                question: "What are the purposes of use case diagrams?",
                answer: "Capturing functional requirements, understanding user interactions, and planning/testing."
            },

            {
                question: "How do you identify use cases?",
                answer: "Identify actors, define goals, outline interactions, and validate use cases."
            },

            {
                question: "What is an actor in a use case?",
                answer: "A human user or another system that interacts with the system."
            },

            {
                question: "What is a class diagram?",
                answer: "A diagram showing how elements of a system are organized and related."
            },

            {
                question: "What are attributes in a class diagram?",
                answer: "Data or properties that describe a class."
            },

            {
                question: "What are methods in a class diagram?",
                answer: "Actions or operations that a class can perform."
            },

            {
                question: "What is inheritance in a class diagram?",
                answer: "A relationship where a specialized class inherits from a more general class."
            },

            {
                question: "What is a sequence diagram?",
                answer: "A diagram showing how objects interact through messages in a particular sequence over time."
            },

            {
                question: "What does a sequence diagram help explain?",
                answer: "The flow of messages and interactions between objects over time."
            },

            {
                question: "What is an activity diagram?",
                answer: "A diagram showing the flow of activities or steps in a process."
            },

            {
                question: "What are activity diagrams useful for?",
                answer: "Modeling the logic and flow of complex operations."
            },

            {
                question: "How can UML be used in planning?",
                answer: "UML diagrams map system requirements and design before coding."
            },

            {
                question: "How can UML be used in development?",
                answer: "Developers use diagrams to understand system structure and relationships."
            },

            {
                question: "How can UML improve communication?",
                answer: "Diagrams help technical and non-technical stakeholders understand the system."
            },

            {
                question: "What is a design pattern?",
                answer: "A common reusable solution or template for recurring software development problems."
            },

            {
                question: "What is the Singleton Pattern?",
                answer: "It ensures a specific object or resource is created only once and reused."
            },

            {
                question: "What is the Factory Pattern?",
                answer: "It creates objects without exposing the details of how those objects are created."
            },

            {
                question: "What is the Observer Pattern?",
                answer: "It automatically notifies interested objects when a source changes."
            },

            {
                question: "What is the Strategy Pattern?",
                answer: "It allows choosing among different approaches or algorithms for a task."
            },

            {
                question: "How do design patterns help software design?",
                answer: "They reduce complexity, improve reuse, and provide common vocabulary for developers."
            },

            {
                question: "What qualities can design patterns help create?",
                answer: "Flexible, maintainable, and understandable systems."
            },

            {
                question: "Where are design patterns commonly used?",
                answer: "They are widely used in software frameworks and libraries."
            },

            {
                question: "What is MVC?",
                answer: "Model-View-Controller, a design pattern used in web development frameworks."
            }

        ]
    }
};
```
