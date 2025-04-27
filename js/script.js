// Global variables
let currentQuiz = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];
let userAnswers = [];
let timer;
let timeLeft = 0;
let totalTime = 15 * 60; // 15 minutes in seconds
let quizStarted = false;
let quizMode = '';


// Main data structure for questions organized by week
const weeklyQuestions = {
    1: [
        {
            question: "Which of the following fall(s) under the 'essential characteristics' of cloud computing?",
            choice1: "Resource Pooling",
            choice2: "Measured Service",
            choice3: "Rapid Elasticity",
            choice4: "Latency",
            answer: [1, 2, 3]
        },
        {
            question: "'Google Doc' is an example of",
            choice1: "PaaS",
            choice2: "IaaS",
            choice3: "SaaS",
            choice4: "FaaS",
            answer: 3
        },
        {
            question: "Business-Process-as-a-Service is not a part of XaaS.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 2
        },
        {
            question: "Network Function Virtualization involves the implementation of _______ function in software that can run on a range of industry-standard servers ______________.",
            choice1: "network, software",
            choice2: "hardware, software",
            choice3: "hardware, network",
            choice4: "network, hardware",
            answer: 4
        },
        {
            question: "Which are the following applications for SaaS (Software as a Service) architecture?",
            choice1: "Billing software",
            choice2: "CRM",
            choice3: "App engines",
            choice4: "None of above",
            answer: [1, 2]
        },
        {
            question: "Web access to commercial software is one of the SaaS characteristics in the cloud computing paradigm.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 1
        },
        {
            question: "In the case of the client-server model: Statement (i) Virtualization is a core concept; Statement (ii) system can scale infinitely",
            choice1: "Only Statement (i) is correct",
            choice2: "Only Statement (ii) is correct",
            choice3: "Both Statements (i) and (ii) are correct",
            choice4: "None of the statements is correct",
            answer: 4
        },
        {
            question: "Client-server model is always load-balanced",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 2
        },
        {
            question: "PaaS (Platform as a Service) brings the benefits: (i) Creation of software (ii) Integration of web services and databases",
            choice1: "Only (i)",
            choice2: "Only (ii)",
            choice3: "Both (i) and (ii)",
            choice4: "Neither (i) nor (ii)",
            answer: 3
        },
        {
            question: "Which of the following is false?",
            choice1: "Private cloud is dedicated solely to an organization.",
            choice2: "Community cloud is a composition of public and private cloud.",
            choice3: "Public cloud is available to the general public.",
            choice4: "None of these",
            answer: 2
        }
    ],
    2: [
        {
            question: "Service-Oriented Architecture (SOA) possess:",
            choice1: "A service provider, service requestor and service broker",
            choice2: "A service provider and service requestor",
            choice3: "A service requestor and service broker",
            choice4: "Only a service broker",
            answer: 1
        },
        {
            question: "XML is designed to describe _________.",
            choice1: "pricing",
            choice2: "SLA",
            choice3: "data",
            choice4: "service",
            answer: 3
        },
        {
            question: "SOAP (Simple Object Access Protocol) does not restrict the endpoint implementation technology choices. SOAP is a platform-neutral choice.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 1
        },
        {
            question: "A Cyber‐Physical Cloud Computing (CPCC) architectural framework is a ________environment that can rapidly build, modify and provision cyber‐physical systems composed of a set of__________ based sensor, processing, control, and data services.",
            choice1: "system, cloud computing",
            choice2: "cloud computing, system",
            choice3: "system, edge computing",
            choice4: "edge, system computing",
            answer: 1
        },
        {
            question: "Network Virtualization is a _________ environment that allows _______ service providers to dynamically compose ____________virtual networks.",
            choice1: "networking, single, single",
            choice2: "physical, single, multiple",
            choice3: "networking, multiple, single",
            choice4: "networking, multiple, multiple",
            answer: 4
        },
        {
            question: "Customized wearable devices for collecting health parameters are the best examples of",
            choice1: "IoHT",
            choice2: "Fog device",
            choice3: "Fog-Cloud interfaced",
            choice4: "Cloud-Fog-Edge-IoHT",
            answer: 4
        },
        {
            question: "Dew Computing is a paradigm where on-premises computers provide functionality that is _________ of cloud services and is also collaborative with cloud services",
            choice1: "dependant",
            choice2: "independent",
            choice3: "partial dependant",
            choice4: "none of these",
            answer: 2
        },
        {
            question: "SOAP uses ______ as transport protocol",
            choice1: "UDDI",
            choice2: "SLA",
            choice3: "HTTP",
            choice4: "XML",
            answer: 3
        },
        {
            question: "Virtual Machine Monitor is also known as",
            choice1: "Cluster Manager",
            choice2: "Virtual Machine Handler",
            choice3: "Virtual Machine Manager",
            choice4: "Hypervisor",
            answer: 4
        },
        {
            question: "Which of the following is/are XML parser API(s)?",
            choice1: "XaaS (Anything as a Model)",
            choice2: "SAX (Simple API to XML)",
            choice3: "CLI (Command Line Interface)",
            choice4: "DOM (Document Object Model)",
            answer: [2, 4]
        }
    ],
    // Week 3 Questions
3: [
    {
        question: "Which of the following is/are NOT SLA requirement(s) of PaaS cloud delivery model?",
        choice1: "Privacy",
        choice2: "Data Retention and Deletion",
        choice3: "Machine-Readable SLAs",
        choice4: "Certification",
        answer: 2
    },
    {
        question: "Which of the following is/are true regarding penalty cost? (Here D(t) and R(t) are instantaneous demand and resources at time t.)",
        choice1: "Penalty cost ∝ ∫|D(t) / R(t)| dt",
        choice2: "If demand is flat, penalty is equal to 0.",
        choice3: "If demand is exponential (D(t)=e^t), any fixed provisioning interval (tp) according to the current demands will fall linearly behind.",
        choice4: "The penalty cost for exponential demand is exponential.",
        answer: [2, 4]
    },
    {
        question: "Row-oriented storage is efficient for data-warehouse workloads.",
        choice1: "TRUE",
        choice2: "FALSE",
        choice3: "",
        choice4: "",
        answer: 2
    },
    {
        question: "Which of the following is/are example(s) of cloud SLA(s) with IaaS delivery model?",
        choice1: "Amazon EC2",
        choice2: "Google App Engine",
        choice3: "Salesforce CRM",
        choice4: "Zoho mail",
        answer: 1
    },
    {
        question: "Which of the following OpenStack components is used for block storage services?",
        choice1: "Keystone",
        choice2: "Cinder",
        choice3: "Swift",
        choice4: "Neutron",
        answer: 2
    },
    {
        question: "In cloud, service downtime is 30 minutes and availability of the service is 0.80. What is the service uptime?",
        choice1: "120 minutes",
        choice2: "60 minutes",
        choice3: "150 minutes",
        choice4: "135 minutes",
        answer: 3
    },
    {
        question: "In Google File System (GFS), the master maintains regular communication with the chunk servers.",
        choice1: "TRUE",
        choice2: "FALSE",
        choice3: "",
        choice4: "",
        answer: 1
    },
    {
        question: "What is/are the expected SLA parameters for Software-as-a-Service (SaaS):",
        choice1: "Reliability",
        choice2: "Usability",
        choice3: "Cache Memory size",
        choice4: "Customizability",
        answer: [1, 4]
    },
    {
        question: "Which of the following option(s) is/are correct?",
        choice1: "Service Level Agreement(SLA) contains Service Level Objectives(SLO)",
        choice2: "Service Level Objectives(SLO) contains Service Level Agreement(SLA)",
        choice3: "Multiple Service Level Agreements (SLAs) are aggregated to Key Performance Indicator (KPI)",
        choice4: "Key Performance Indicators (KPIs) are aggregated to Service Level Objectives(SLO)",
        answer: 1
    },
    {
        question: "Statement 1: In OpenStack block storage, the stored objects persist until the VM is terminated. Statement 2: In OpenStack ephemeral storage, the stored objects are accessible from within VM as local file system.",
        choice1: "Both statement 1 and 2 are correct",
        choice2: "Statement 1 is correct and statement 2 is incorrect",
        choice3: "Statement 2 is correct and statement 1 is incorrect",
        choice4: "Both statement 1 and 2 are incorrect",
        answer: 3
    }
],

// Week 4 Questions
4: [
    {
        question: "In Google Cloud Platform (GCP), Cloud Datastore provides flexible object storage with global edge caching.",
        choice1: "TRUE",
        choice2: "FALSE",
        choice3: "",
        choice4: "",
        answer: 2
    },
    {
        question: "Match the following: A. Cinder, OpenStack B. GoogleAPIs C. Cloud SQL with 1. MySQL or NoSQL databases. 2. Google's fully managed, petabyte scale, low cost analytics data warehouse to find meaningful insights. 3. Integrate Google's services into the application. 4. Manages block storage in OpenStack.",
        choice1: "A-4, B-3, C-1",
        choice2: "A-1, B-3, C-2",
        choice3: "A-2, B-4, C-1",
        choice4: "A-3, B-1, C-2",
        answer: 1
    },
    {
        question: "Statement 1: Azure supports public cloud platform. Statement 2: Azure App Service plan defines security.",
        choice1: "Statement 1 is True and Statement 2 is False",
        choice2: "Statement 1 is False and Statement 2 is True",
        choice3: "Both are True",
        choice4: "Both are False",
        answer: 1
    },
    {
        question: "Which of the following components of OpenStack is responsible for providing persistent block storage to running instances?",
        choice1: "Nova",
        choice2: "Cinder",
        choice3: "Swift",
        choice4: "None of the above",
        answer: 2
    },
    {
        question: "Which of the following is/are App services provided by Google Cloud Platform?",
        choice1: "BigQuery",
        choice2: "Google App Engine",
        choice3: "Cloud Endpoints",
        choice4: "Cloud SQL",
        answer: [1, 3]
    },
    {
        question: "Which of the following is/are App Services provided by Google Cloud Platform?",
        choice1: "Big Query",
        choice2: "Cloud App Engine",
        choice3: "Cloud Endpoints",
        choice4: "Cloud SQL",
        answer: [1, 2, 4]
    },
    {
        question: "Google Cloud End Points helps to:",
        choice1: "migrate the web app to Google Cloud Platform.",
        choice2: "scale up the app according to the demand/service requests.",
        choice3: "provide flexible object storage with global edge caching.",
        choice4: "Integrate Google's services into the application.",
        answer: 2
    },
    {
        question: "The Azure App plan has a scale count of instances.",
        choice1: "1 to 50",
        choice2: "1 to 20",
        choice3: "1 to 10",
        choice4: "1 to 100",
        answer: 2
    },
    {
        question: "Match the following columns regarding OpenStack: Column 1: A. Ephemeral storage, B. Block storage, C. Object storage; Column 2: 1. Cinder, 2. Nova, 3. Swift",
        choice1: "A-1, B-2, C-3",
        choice2: "A-2, B-3, C-1",
        choice3: "A-3, B-1, C-2",
        choice4: "A-2, B-1, C-3",
        answer: 4
    },
    {
        question: "In GCP, 'gcloud app browse' - can be used to start the local development server for the application.",
        choice1: "TRUE",
        choice2: "FALSE",
        choice3: "",
        choice4: "",
        answer: 2
    }
],

    5: [
        {
            question: "In a SLA negotiation, the provider agreed with the service availability of 98%. The consumer runs the application for X hours/day. At the end of one month [31 days], the total service outage was 12 hrs. However, SLA negotiation (in terms of service availability) is honored.",
            choice1: "X is atleast 19.74",
            choice2: "X is atmost 19.74",
            choice3: "X is exactly 19.74",
            choice4: "Insufficient information",
            answer: 1
        },
        {
            question: "Average resource demand is 45 units, Baseline (owned) unit cost is 200 units, Time is 10 hours, Peak resource demand is 100 units. If the cloud is cheaper than owning of computer infrastructures, the utility premium is",
            choice1: "Greater than 2.22",
            choice2: "Less than 2.22",
            choice3: "Atleast 4.45",
            choice4: "Atmost 4.45",
            answer: 2
        },
        {
            question: "In computing, there is a linear relationship between the number of processing cores used and power consumption.",
            choice1: "TRUE",
            choice2: "FALSE",
            choice3: "",
            choice4: "",
            answer: 1
        },
        {
            question: "The ________ takes a series of key/value pairs, processes each, and generates zero or more output.",
            choice1: "map function",
            choice2: "partition function",
            choice3: "reduce function",
            choice4: "None of these",
            answer: 1
        },
        {
            question: "In a MapReduce framework the HDFS block size is 64 MB. We have 6 files of size 64KB, 65MB, X MB, Y KB, 67KB and 127MB. 24 blocks are created by Hadoop framework. The size of X and Y are respectively [one or more than one options may be correct, select all correct options]:",
            choice1: "66 and 64",
            choice2: "64 and 64",
            choice3: "64 and 66",
            choice4: "128 and 64",
            answer: [2, 3]
        },
        {
            question: "Which among the following is/are logical resource(s)?",
            choice1: "Network",
            choice2: "Computer",
            choice3: "Database",
            choice4: "Execution",
            answer: 4
        },
        {
            question: "When load decreases, VM management can be done by",
            choice1: "Live migrate VMs to more utilized nodes",
            choice2: "Shutdown unused nodes",
            choice3: "Migrate VMs to less utilized nodes",
            choice4: "None of these",
            answer: [1, 2]
        },
        {
            question: "Correspondence between resources required by the users and resources available with the provider is known as",
            choice1: "Resource provisioning",
            choice2: "Resource adaptation",
            choice3: "Resource mapping",
            choice4: "None of these",
            answer: 3
        },
        {
            question: "Ability or capacity of that system to adjust the resources dynamically to fulfill the requirements of the user is known as",
            choice1: "Resource provisioning",
            choice2: "Resource adaptation",
            choice3: "Resource mapping",
            choice4: "None of these",
            answer: 2
        },
        {
            question: "Statement 1: Map operation consists of transforming one set of key-value pairs to another. Statement 2: Each reducer groups the results of the map step using the same key.",
            choice1: "Both statements are true",
            choice2: "Both statements are false",
            choice3: "Statement 1 is true and Statement 2 is false",
            choice4: "Statement 1 is false and Statement 2 is true",
            answer: 1
        }
    ],
    6: [
        {
            question: "Interception is considered as an attack on",
            choice1: "Confidentiality",
            choice2: "Availability",
            choice3: "Integrity",
            choice4: "Authenticity",
            answer: 1
        },
        {
            question: "Find the correct statement(s):",
            choice1: "Different types of cloud computing service models provide different levels of services security",
            choice2: "Adapting your on-premises systems to a cloud model requires that you determine what security mechanisms are required and mapping those to controls that exist in your chosen cloud service provider",
            choice3: "Data should be transferred and stored in an encrypted format for security purpose",
            choice4: "All are incorrect statements",
            answer: [1, 2, 3]
        },
        {
            question: "Which of the following is/are example(s) of passive attack?",
            choice1: "Replay",
            choice2: "Denial of service",
            choice3: "Traffic analysis",
            choice4: "Masquerade",
            answer: 3
        },
        {
            question: "Modification is considered as an attack on",
            choice1: "Confidentiality",
            choice2: "Availability",
            choice3: "Integrity",
            choice4: "Authenticity",
            answer: 3
        },
        {
            question: "Spoofing is not an example of",
            choice1: "Deception",
            choice2: "Disclosure",
            choice3: "Usurpation",
            choice4: "Disruption",
            answer: [2, 4]
        },
        {
            question: "Consider the following statements: Statement I: Authorization is the identification of legitimate users. Statement II: Integrity is the protection against data alteration/corruption. Identify the correct options:",
            choice1: "Statement I is TRUE and statement II is FALSE.",
            choice2: "Statement I is FALSE and statement II is TRUE.",
            choice3: "Both statements are TRUE.",
            choice4: "Both statements are FALSE.",
            answer: 2
        },
        {
            question: "Access policy control refers to",
            choice1: "Cyclic Inheritance Control",
            choice2: "Virus Attack",
            choice3: "Violation of SoD (separation of duties) Constraint",
            choice4: "Man in the middle attack",
            answer: [1, 3]
        },
        {
            question: "Which of the options is/are considered as the basic components of security?",
            choice1: "Confidentiality",
            choice2: "Integrity",
            choice3: "Reliability",
            choice4: "Efficiency",
            answer: [1, 2]
        },
        {
            question: "Which of the following is/are not a type of passive attack?",
            choice1: "Traffic Analysis",
            choice2: "Release of message contents",
            choice3: "Denial of service",
            choice4: "Replay",
            answer: [3, 4]
        },
        {
            question: "Side channel exploitation has the potential to extract RSA & AES secret keys",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 1
        }
    ],
    7: [
        {
            question: "The key features of mobile cloud computing (MCC) are",
            choice1: "Facilitates the quick development, delivery and management of mobile apps",
            choice2: "Uses more device resources because applications are cloud-supported",
            choice3: "Improves reliability with information backed up and stored in the cloud",
            choice4: "None of these",
            answer: [1, 3]
        },
        {
            question: "Dynamic runtime offloading involves the issues of",
            choice1: "Runtime application partitioning",
            choice2: "Migration of intensive components",
            choice3: "Continuous synchronization for the entire duration of runtime execution platform",
            choice4: "None of these",
            answer: [1, 2, 3]
        },
        {
            question: "What is/are true about cloudlet?",
            choice1: "Increases the latency in reaching the cloud servers",
            choice2: "Reduces the latency in reaching the cloud servers",
            choice3: "Resides far from the mobile devices",
            choice4: "Resides near to the mobile devices",
            answer: [2, 4]
        },
        {
            question: "What is/are true about mobile cloud computing (MCC)?",
            choice1: "MCC increases the running cost for computation intensive applications",
            choice2: "MCC reduces the running cost for computation intensive applications",
            choice3: "MCC decreases battery lifetime",
            choice4: "None of these",
            answer: 2
        },
        {
            question: "What is/are true about the execution of services in mobile cloud computing (MCC)?",
            choice1: "All services are executed in cloud",
            choice2: "Some services are executed in mobile devices and some services are executed in cloud",
            choice3: "All computation intensive services are executed in mobile devices",
            choice4: "None of these",
            answer: 2
        },
        {
            question: "What of the following is/are fog device(s)?",
            choice1: "Cellular base stations",
            choice2: "Network routers",
            choice3: "WiFi Gateways",
            choice4: "None of these",
            answer: [1, 2, 3]
        },
        {
            question: "What is/are the advantage(s) of fog computing?",
            choice1: "Reduction in data movement across the network resulting in reduced congestion",
            choice2: "Increase in data movement across the network resulting in increased congestion",
            choice3: "Serving the real-time applications",
            choice4: "None of these",
            answer: [1, 3]
        },
        {
            question: "Consider the following statements: Statement 1: In Geospatial Cloud, it is needed to integrate data from heterogeneous back-end data service. Statement 2: Data services can be inside and/or outside of the cloud environment in Geospatial Cloud.",
            choice1: "Statement 1 is Correct, but Statement 2 is Incorrect.",
            choice2: "Statement 2 is Correct, but Statement 1 is Incorrect.",
            choice3: "Both statements are Correct.",
            choice4: "Both statements are Incorrect",
            answer: 3
        },
        {
            question: "Which of the following statement(s) is/are FALSE about Fog Computing?",
            choice1: "Fog nodes present near to the end-user",
            choice2: "Fog computing enables real-time applications",
            choice3: "Fog nodes' response time is much higher than Cloud's",
            choice4: "Network routers, WiFi Gateways will not be capable of running applications",
            answer: [3, 4]
        },
        {
            question: "Which of the following is/are true about Geospatial Cloud Model?",
            choice1: "It integrates data from homogeneous back-end data services",
            choice2: "Data services can be inside and/or outside the cloud environment",
            choice3: "Data services inside cloud can be run through SaaS service model",
            choice4: "None of the above",
            answer: 2
        }
    ],
    8: [
        {
            question: "An IoT platform's basic building blocks is/ are (choose the correct option(s)).",
            choice1: "Gateway",
            choice2: "Images",
            choice3: "Network and Cloud",
            choice4: "Containers",
            answer: [1, 3]
        },
        {
            question: "__________ is used to delete a local image.",
            choice1: "Docker rm",
            choice2: "Docker rmi",
            choice3: "Docker rvi",
            choice4: "Docker push",
            answer: 2
        },
        {
            question: "Docker Hub is a registry used to host various docker images.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 1
        },
        {
            question: "__________ enables different networks, spreads in a huge geographical area to connect together and be employed simultaneously by multiple users on demand.",
            choice1: "Serverless",
            choice2: "IoT Cloud",
            choice3: "Sensor Cloud",
            choice4: "Green Cloud",
            answer: 3
        },
        {
            question: "Virtual machines get virtual access to host resources through a ________",
            choice1: "Containers",
            choice2: "Hypervisor",
            choice3: "Both a and b",
            choice4: "Images",
            answer: 2
        },
        {
            question: "Vehicles providing their networking and data processing capabilities to other vehicles through the cloud comes under which service of IoT-based Vehicular Data Clouds.",
            choice1: "SaaS",
            choice2: "PaaS",
            choice3: "IaaS",
            choice4: "None of these",
            answer: 3
        },
        {
            question: "Sensor data can be easily shared by different groups of users without any extra effort/ measure.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 2
        },
        {
            question: "Container is a compile time instance of an image.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 2
        },
        {
            question: "In the context of Green Cloud Computing, the Power Usage Effectiveness is defined as",
            choice1: "Power Delivered / Overall Power",
            choice2: "Overall Power / Power Delivered",
            choice3: "Overall Power * Power Delivered",
            choice4: "None of these",
            answer: 2
        },
        {
            question: "Statement 1: Sensor-Cloud proxy exposes sensor resources as cloud services. Statement 2: Sensor network is still managed from the Sensor-Cloud Interface via Sensor Network Proxy",
            choice1: "Statement 1 is True and Statement 2 is False",
            choice2: "Statement 2 is True and Statement 1 is False",
            choice3: "Both statements are True",
            choice4: "Both statements are False",
            answer: 3
        }
    ],
    9: [
        {
            question: "Which of the following statements best describes fog computing?",
            choice1: "Fog computing refers to a model where data, processing, and applications are concentrated in the cloud rather than at the network edge.",
            choice2: "Fog computing is a term introduced by Cisco Systems to describe a model that centralizes data processing in the cloud to manage wireless data transfer to distributed IoT devices.",
            choice3: "Fog computing is a model where data, processing, and applications are concentrated in devices at the network edge rather than existing almost entirely in the cloud.",
            choice4: "The vision of fog computing is to enable applications on a few connected devices to run directly in the cloud without interaction at the network edge.",
            answer: 3
        },
        {
            question: "Which of the following challenges is most effectively addressed by using fog and edge computing instead of a 'cloud-only' approach for IoT applications?",
            choice1: "Resource management issues related to workload balance and task scheduling in cloud-based environments.",
            choice2: "The inefficiency of processing time-sensitive applications directly in the cloud due to high latency and large data bandwidth requirements.",
            choice3: "The need for improved security and privacy features in cloud-based systems, which are not addressed by fog and edge computing.",
            choice4: "The difficulty in integrating multiple cloud services and platforms for comprehensive IoT data management.",
            answer: 2
        },
        {
            question: "Which of the following correctly describes a classification of resource management architectures in fog/edge computing?",
            choice1: "Data Flow",
            choice2: "Control",
            choice3: "Tenancy",
            choice4: "Infrastructure",
            answer: 3
        },
        {
            question: "Which of the following characteristics is NOT typically associated with fog computing infrastructure?",
            choice1: "Location awareness and low latency",
            choice2: "Better bandwidth utilization",
            choice3: "High computational power concentrated solely in the Cloud",
            choice4: "Support for mobility",
            answer: 3
        },
        {
            question: "In the fog computing paradigm, which of the following accurately describes the relationship between local and global analyses?",
            choice1: "Local analyses are performed exclusively in the Cloud, while global analyses are done at the edge devices.",
            choice2: "Local and global analyses are performed only in the Cloud data centers.",
            choice3: "Local analyses are performed at the edge devices, and global analyses can be either performed at the edge or forwarded to the Cloud.",
            choice4: "Local analyses are conducted by IoT devices, and global analyses are not necessary in fog computing.",
            answer: 3
        },
        {
            question: "What is the primary goal of the application placement problem in the Cloud-Fog-Edge framework?",
            choice1: "To map all applications onto the Cloud servers to maximize computational power.",
            choice2: "To find available resources in the network that satisfy application requirements, respect constraints, and optimize the objective, such as minimizing energy consumption.",
            choice3: "To place all application components on edge devices to ensure low latency.",
            choice4: "To disregard resource capacities and focus solely on network constraints.",
            answer: 2
        },
        {
            question: "Which of the following is an example of an application constraint in the application placement problem on the Cloud-Fog-Edge framework?",
            choice1: "Finite capabilities of CPU and RAM on infrastructure nodes.",
            choice2: "Network latency and bandwidth limitations.",
            choice3: "Locality requirements restricting certain services' executions to specific locations.",
            choice4: "Availability of storage resources in the Fog nodes.",
            answer: 3
        },
        {
            question: "What is the primary purpose of offloading in the context of edge computing?",
            choice1: "To move all data processing from edge nodes to the cloud.",
            choice2: "To augment computing requirements by moving servers, applications, and associated data closer to the network edge.",
            choice3: "To reduce the number of user devices connected to the network.",
            choice4: "To centralize all computational resources in the cloud for better performance.",
            answer: 2
        },
        {
            question: "What is the primary goal of a cloud federation?",
            choice1: "To centralize all cloud services under a single provider.",
            choice2: "To deploy and manage multiple cloud services to meet business needs by collaborating among different Cloud Service Providers (CSPs).",
            choice3: "To limit the geographical reach of cloud services.",
            choice4: "To reduce the number of cloud service providers globally.",
            answer: 2
        },
        {
            question: "Which of the following is a key benefit of forming a cloud federation?",
            choice1: "Centralized control of global cloud services.",
            choice2: "Increased resource utilization and load balancing across multiple Cloud Service Providers (CSPs).",
            choice3: "Reduced collaboration among Cloud Service Providers.",
            choice4: "Limiting the geographical footprint of Cloud Service Providers.",
            answer: 2
        }
    ],
    10: [
        {
            question: "Post-copy and Pre-copy migration approaches are employed in :",
            choice1: "Live Migration process",
            choice2: "Non-live Migration process",
            choice3: "Hybrid Migration process",
            choice4: "None of these",
            answer: 1
        },
        {
            question: "Kubernetes operates at the hardware level.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 2
        },
        {
            question: "What is(are) the key advantage(s) of Docker?",
            choice1: "Facilitating microservices",
            choice2: "Modeling networks",
            choice3: "Packaging software",
            choice4: "None of these",
            answer: [1, 2, 3]
        },
        {
            question: "Which of the following statements is most appropriate about Docker ?",
            choice1: "Docker is a platform that allows to build and run but not ship apps.",
            choice2: "Docker is a platform that allows to build and ship but but not to run apps.",
            choice3: "Docker is a platform that allows to build, ship and, run apps.",
            choice4: "Docker is a platform that only allows to ship and run but not to build apps.",
            answer: 3
        },
        {
            question: "In Docker utility, ___________ is a collection of filesystem layers and some metadata that, if taken together, can be spun up as Docker containers.",
            choice1: "Operating System",
            choice2: "Microservice",
            choice3: "Virtual Machine",
            choice4: "Image",
            answer: 4
        },
        {
            question: "Containers are similar to VMs but they have unrelaxed isolation properties to share the operating system among the applications.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 2
        },
        {
            question: "Choose the most appropriate option. Statement 1: Container is a lightweight virtualization technique. Statement 2: Container contains the code and all its dependencies.",
            choice1: "Only statement 1 is true",
            choice2: "Only statement 2 is true",
            choice3: "Both statement 1 and 2 are true",
            choice4: "Bothe the statements are false",
            answer: 3
        },
        {
            question: "Private Docker registry is a service that stores Docker images.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 1
        },
        {
            question: "Docker builds offer enhanced reproducibility and replicability compared to conventional software development approaches.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 1
        },
        {
            question: "Given the VM memory size of 1024 GB and the transmission rate of 16 MB/sec What are the total migration time and downtime for non-live VM migration? Choose the most appropriate option.",
            choice1: "20 hours, 25 hours",
            choice2: "18 hours,18 hours",
            choice3: "16 hours, 16 hours",
            choice4: "24 hours,20 hours",
            answer: 2
        }
    ],
    11: [
        {
            question: "Which of the following statements is/are false?",
            choice1: "Serverless computing allows the users with more control over the deployment environment compared to PaaS.",
            choice2: "Serverless computing is a form of cloud computing that allows users to run event driven granular applications.",
            choice3: "",
            choice4: "",
            answer: 1
        },
        {
            question: "Which of the following options is most appropriate for FaaS? Statement 1: Each function in the FaaS platform gets unlimited execution time. Statement 2: Functions are always active and ready for execution.",
            choice1: "Statement 1 is correct but Statement 2 is incorrect.",
            choice2: "Statement 2 is correct but Statement 1 is incorrect.",
            choice3: "Both the statements are correct.",
            choice4: "Both the statements are incorrect.",
            answer: 4
        },
        {
            question: "AWS S3 is a fully managed proprietary NoSQL database service that supports key-value and document data structures and is offered by Amazon.com as part of the Amazon Web Services portfolio.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 2
        },
        {
            question: "BigQuery is a fully-managed, serverless data warehouse by",
            choice1: "AWS",
            choice2: "Google",
            choice3: "Microsoft",
            choice4: "IBM",
            answer: 2
        },
        {
            question: "AWS charges for the provisioned resources and executing Lambda.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 2
        },
        {
            question: "In serverless computing the user has to manage the scalability needs of a function, unlike FaaS.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 2
        },
        {
            question: "Which of the following is/are the goal of sustainable cloud computing? Choose the most appropriate option.",
            choice1: "Minimizing the energy consumption.",
            choice2: "Increasing reliability of CDCs.",
            choice3: "Minimizing carbon footprint related cost.",
            choice4: "Increasing network traffic",
            answer: [1, 2, 3]
        },
        {
            question: "Which of the following is not a category of research initiative on sustainable cloud computing?",
            choice1: "Renewable Energy",
            choice2: "Capacity planning",
            choice3: "Environment Sandboxing",
            choice4: "None of these",
            answer: 3
        },
        {
            question: "CDCs consist of a chassis and racks to place the servers to process the IT workloads.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 1
        },
        {
            question: "________ are an important distribution mechanism for libraries and custom runtimes in AWS serverless ecosystem.",
            choice1: "Runtimes",
            choice2: "Lambda Layers",
            choice3: "Log streams",
            choice4: "None of these",
            answer: 2
        }
    ]
    ,
    12: [
        {
            question: "In which computing environment is latency fixed due to the location of application modules at the Area Gateway?",
            choice1: "Fog computing",
            choice2: "Cloud computing",
            choice3: "Serverless Computing",
            choice4: "None of the above",
            answer: 1
        },
        {
            question: "What does spatial cloud support in terms of resource pooling?",
            choice1: "Individual resource allocation for participating organizations",
            choice2: "Exclusive resource ownership for each organization",
            choice3: "Shared resource pooling for participating organizations",
            choice4: "Restricted access to network, servers, apps, services, storages, and databases",
            answer: 3
        },
        {
            question: "Dew computing is an on premises computer software-hardware organization paradigm where on‐premises computers provide functionality that is ___________ of cloud services and is also ________ with cloud services.",
            choice1: "independent, serverless",
            choice2: "dependant, collaborative",
            choice3: "independent, collaborative",
            choice4: "serverless, collaborative",
            answer: 3
        },
        {
            question: "Fog-Edge computing leads to increased network congestion",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 2
        },
        {
            question: "A Cyber‐Physical Cloud Computing (CPCC) architectural framework is a ________ environment that can rapidly build, modify and provision cyber‐physical systems composed of a set of __________ based sensor, processing, control, and data services.",
            choice1: "system, cloud computing",
            choice2: "cloud computing, system",
            choice3: "system, edge computing",
            choice4: "edge, system computing",
            answer: 1
        },
        {
            question: "What is(are) the key feature(s) of Mobile Cloud computing for 5G networks?",
            choice1: "Increased resource consumption by mobile applications",
            choice2: "Improved reliability due to data storage in the cloud",
            choice3: "Sharing resources for mobile applications",
            choice4: "None of these",
            answer: [2, 3]
        },
        {
            question: "The key aspect of the intelligent transportation system is efficient _____________.",
            choice1: "cost",
            choice2: "mobility",
            choice3: "speed",
            choice4: "delivery",
            answer: 2
        },
        {
            question: "In conjunction with 5G and cloud computing, what should service providers focus on in the evolving computing paradigm?",
            choice1: "Limiting end-to-end orchestration",
            choice2: "Providing manual service layer agreements",
            choice3: "Offering limited self-service options",
            choice4: "Providing full end-to-end orchestration with defined service layer agreements",
            answer: 4
        },
        {
            question: "Mobility Analytics utilizes the cloud platform for computation and storage.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 1
        },
        {
            question: "What is(are) the benefit(s) of 5G technology for enhanced mobile broadband?",
            choice1: "Slower data rates",
            choice2: "Higher latency",
            choice3: "Lower cost-per-bit",
            choice4: "Limited device compatibility",
            answer: 3
        }
    ]
};

// Previous Year Questions - Set 1
// Weekly Questions organized by week number
const pyqSet1 = {
    1: [
      {
        question: "Utility computing encapsulates the following characteristic(s)",
        choice1: "Mobility amalgamation",
        choice2: "No impact on resource utilization",
        choice3: "Pay-per-use pricing business model",
        choice4: "None of above",
        answer: 3
      },
      {
        question: "In the context of the client-server architecture: Statement (i) posits that virtualization is a fundamental principle; Statement (ii) claims that the system has limited scalability.",
        choice1: "Only Statement (i) is correct",
        choice2: "Only Statement (ii) is correct",
        choice3: "Both Statements (i) and (ii) are correct",
        choice4: "None of the statements is correct",
        answer: 2
      },
      {
        question: "A cluster is a type of ________ or distributed computing platform consisting of a collection of interconnected stand-alone computing computers working together in a _________computing resource.",
        choice1: "computers, parallel",
        choice2: "single integrated, parallel",
        choice3: "node, parallel",
        choice4: "parallel, single integrated",
        answer: 4
      },
      {
        question: "Dropbox is an example of:",
        choice1: "Software as a Service or SaaS",
        choice2: "Platform as a Service or PaaS",
        choice3: "Function as a Service or FaaS",
        choice4: "Infrastructure as a Service or IaaS",
        answer: 1
      },
      {
        question: "For less data-intensive applications, horizontal scale-out elasticity is the ideal solution.",
        choice1: "True",
        choice2: "False",
        choice3: "",
        choice4: "",
        answer: 2
      },
      {
        question: "The combination of Service-Oriented Infrastructure and Cloud Computing leads to ________.",
        choice1: "PaaS",
        choice2: "FaaS",
        choice3: "Serverless",
        choice4: "XaaS",
        answer: 4
      },
      {
        question: "Utility computing is a service-provisioning model, in which a service provider makes computing resources and infrastructure management available to the customer.",
        choice1: "True",
        choice2: "False",
        choice3: "",
        choice4: "",
        answer: 1
      },
      {
        question: "Which of the following is false?",
        choice1: "Private cloud is dedicated solely to an organization.",
        choice2: "Community cloud is a composition of public and private cloud.",
        choice3: "Public cloud is available to the general public.",
        choice4: "None of these",
        answer: 2
      },
      {
        question: "Which of the following is one of the characteristics of PaaS?",
        choice1: "Provides tools to deploy user applications",
        choice2: "Application is provided by the cloud provider",
        choice3: "Resources are distributed as a service",
        choice4: "None of these",
        answer: 1
      },
      {
        question: "Which of the following is/are a type of Grid?",
        choice1: "Computational Grid",
        choice2: "Data Grid",
        choice3: "Edge Grid",
        choice4: "All of the above",
        answer: [1, 2]
      }
    ],
    2: [
      {
        question: "___________ generally stores the cloud subscriber’s metadata like user credentials and OS images.",
        choice1: "SLA (Service Level Agreement)",
        choice2: "Cloud Manager",
        choice3: "DOS (Data Object storage)",
        choice4: "MOS (Metadata Object storage)",
        answer: 3
      },
      {
        question: "Universal Description, Discovery, and Integration (UDDI) represents a format for data exchange, designed to hold and convey data objects that are made up of pairs of attributes and values.",
        choice1: "True",
        choice2: "False",
        choice3: "",
        choice4: "",
        answer: 1
      },
      {
        question: "Which factors should an organization consider while planning to deploy an outsourced private cloud?",
        choice1: "Only Network Dependency",
        choice2: "Only Risks from multi-tenancy",
        choice3: "Both Network Dependency and Risks from multi-tenancy",
        choice4: "Neither Network Dependency nor Risks from multi-tenancy",
        answer: 3
      },
      {
        question: "What is/are the main difference(s) between virtualization and dual boot?",
        choice1: "In virtualization, both operating systems run simultaneously, but not in dual boot.",
        choice2: "In virtualization, operating systems are not isolated from each other, but not in dual boot.",
        choice3: "In a dual boot, both operating systems run simultaneously, but not in virtualization.",
        choice4: "No difference between dual boot and virtualization.",
        answer: 1
      },
      {
        question: "Web services enhance distributed interoperability through the use of open standards, enabling any two software components to communicate and are designed to address firewall issues.",
        choice1: "True",
        choice2: "False",
        choice3: "",
        choice4: "",
        answer: 1
      },
      {
        question: "Ubuntu Enterprise Cloud (UEC) is an example of",
        choice1: "Public cloud",
        choice2: "Hybrid cloud",
        choice3: "Private cloud",
        choice4: "Community Cloud",
        answer: 3
      },
      {
        question: "Cloud Manager is the public access point to the cloud where subscribers ________ up for accounts and has a mechanism for ________ subscribers.",
        choice1: "sign, integrating",
        choice2: "sign, authenticating",
        choice3: "sign, accessing",
        choice4: "access, authenticating",
        answer: 2
      },
      {
        question: "Hypervisor is also known as",
        choice1: "Cluster Manager",
        choice2: "Virtual Machine Handler",
        choice3: "Virtual Machine Manager",
        choice4: "Virtual Machine Monitor",
        answer: 4
      },
      {
        question: "Simple Object Access Protocol (SOAP) provides a way to communicate between applications running on different operating systems, with the same technologies and programming languages.",
        choice1: "True",
        choice2: "False",
        choice3: "",
        choice4: "",
        answer: 2
      },
      {
        question: "While DOM operates on the documents as a whole, _____ parsers operate on each piece of the XML document sequentially.",
        choice1: "FTP",
        choice2: "MQTT",
        choice3: "SAX",
        choice4: "XAS",
        answer: 3
      }
    ],
    3: [
      {
        question: "Which of the following system/ architecture follow(s) Quorum protocol for a large number of concurrent reads & writes?",
        choice1: "Google File System (GFS)",
        choice2: "BigTable",
        choice3: "Dynamo",
        choice4: "None of the above",
        answer: 3
      },
      {
        question: "Statement 1: In ephemeral storage, the stored objects persist until the VM is terminated. Statement 2: The ephemeral storage is managed by Cinder in OpenStack.",
        choice1: "Statement 1 is TRUE, Statement 2 is FALSE",
        choice2: "Statement 2 is TRUE, Statement 1 is FALSE",
        choice3: "Both statements are TRUE",
        choice4: "Both statements are FALSE",
        answer: 1
      },
      {
        question: "Column-oriented storage is efficient for data-warehouse workloads.",
        choice1: "TRUE",
        choice2: "FALSE",
        choice3: "",
        choice4: "",
        answer: 1
      },
      {
        question: "Horizon is a __________ self-service portal to interact with underlying OpenStack services",
        choice1: "mobile based",
        choice2: "OS based",
        choice3: "web based",
        choice4: "None of the above",
        answer: 3
      },
      {
        question: "What is the parallel efficiency (Eff) of an algorithm, when a task takes time T in uniprocessor system, P is number of processors, M is time taken by each processor?",
        choice1: "Eff = (T*P)/M",
        choice2: "Eff = T*(M/P)",
        choice3: "Eff = T*P*M",
        choice4: "Eff = T/(P*M)",
        answer: 4
      },
      {
        question: "In cloud, service downtime is 30 minutes and availability of the service is 0.80. What is the service uptime?",
        choice1: "120 minutes",
        choice2: "60 minutes",
        choice3: "150 minutes",
        choice4: "135 minutes",
        answer: 3
      },
      {
        question: "Which of the following is/are NOT SLA requirement(s) of PaaS cloud delivery model?",
        choice1: "Data Retention and Deletion",
        choice2: "Privacy",
        choice3: "Machine-Readable SLAs",
        choice4: "Certification",
        answer: [1, 3]
      },
      {
        question: "What does the ‘availability’ metric represent in the monitoring and auditing of SLAs?",
        choice1: "The speed at which a service responds",
        choice2: "How often the service is available",
        choice3: "The ability for a resource to grow infinitely",
        choice4: "The percentage of uptime for a service",
        answer: 4
      },
      {
        question: "What architecture is used in a parallel database for the efficient execution of SQL queries?",
        choice1: "Shared memory architecture",
        choice2: "Shared disk architecture",
        choice3: "Shared nothing architecture",
        choice4: "Shared cache architecture",
        answer: 3
      },
      {
        question: "_______ is used for networking services in OpenStack.",
        choice1: "Keystone",
        choice2: "Neutron",
        choice3: "Cinder",
        choice4: "Swift",
        answer: 2
      }
    ],
    4: [
      {
        question: "Which of the following statement(s) is/are FALSE for Microsoft Azure Resource Group?",
        choice1: "It is a logical container",
        choice2: "It manages Azure resources",
        choice3: "It deploys web apps, databases, and storage accounts",
        choice4: "It is a physical container",
        answer: 4
      },
      {
        question: "Statement 1: Azure supports public cloud platforms. Statement 2: Azure App Service plan defines security.",
        choice1: "Statement 1 is TRUE, Statement 2 is FALSE",
        choice2: "Statement 2 is TRUE, Statement 1 is FALSE",
        choice3: "Both statements are TRUE",
        choice4: "Both statements are FALSE",
        answer: 1
      },
      {
        question: "Google Cloud Datastore provides flexible object storage with global edge caching.",
        choice1: "TRUE",
        choice2: "FALSE",
        choice3: "",
        choice4: "",
        answer: 2
      },
      {
        question: "Google APIs help to:",
        choice1: "scale up the app according to the demand/ service requests.",
        choice2: "integrate Google’s services into the application.",
        choice3: "migrate the web app to Google Cloud Platform.",
        choice4: "None of the above",
        answer: 2
      },
      {
        question: "Which of the following is/are storage service(s) provided by Google Cloud Platform(GCP)?",
        choice1: "Cloud SQL",
        choice2: "BigQuery",
        choice3: "Cloud Datastore",
        choice4: "Cloud Endpoints",
        answer: [1, 3]
      },
      {
        question: "Match the following columns: A. GoogleAppEngine, B. GoogleCloudEndpoints, C. GoogleAPI: 1. Integrates Google’s services into end users’ application, 2. Helps end users’ application scalability, 3. Helps to migrate web application to Google Cloud Platform",
        choice1: "A-3, B-2, C-1",
        choice2: "A-1, B-2, C-3",
        choice3: "A-3, B-1, C-2",
        choice4: "A-2, B-1, C-3",
        answer: 1
      },
      {
        question: "In OpenStack, when a VM is terminated, which of the following memory resources are freed?",
        choice1: "Ephemeral storage",
        choice2: "Block Storage",
        choice3: "Persistent Storage",
        choice4: "RAM",
        answer: [1, 4]
      },
      {
        question: "Statement 1: When deploying the Azure app remotely, the login password of the Azure account needs to be entered when the system asks for password. Statement 2: In Microsoft Azure, a deployment user is required for FTP and local Git deployment to a web app.",
        choice1: "Statement 1 is True and Statement 2 is False",
        choice2: "Statement 1 is False and Statement 2 is True",
        choice3: "Both are True",
        choice4: "Both are False",
        answer: 2
      },
      {
        question: "The Azure App pan has a scale count of _____ instances.",
        choice1: "1 to 10",
        choice2: "1 to 100",
        choice3: "1 to 50",
        choice4: "1 to 20",
        answer: 4
      },
      {
        question: "While developing a web-app using Google App Engine, the development server should not be kept running when changes are made to the source file.",
        choice1: "TRUE",
        choice2: "FALSE",
        choice3: "",
        choice4: "",
        answer: 2
      }
    ],

    5: [
          {
            question: "____ is a formal contract between a Service Provider (SP) and a Service Consumer (SC).",
            choice1: "SLO",
            choice2: "SLA",
            choice3: "KPI",
            choice4: "Utility Premium",
            answer: 2
          },
          {
            question: "Statement 1: SLA contains SLO. Statement 2: Multiple KPIs are aggregated to SLA.",
            choice1: "Statement 1 is TRUE and Statement 2 is FALSE",
            choice2: "Statement 2 is TRUE and Statement 1 is FALSE",
            choice3: "Both statements are TRUE",
            choice4: "Both statements are FALSE",
            answer: 1
          },
          {
            question: "If demand is flat, the penalty will be linear.",
            choice1: "TRUE",
            choice2: "FALSE",
            choice3: "",
            choice4: "",
            answer: 2
          },
          {
            question: "What is/are the correct statement(s) regarding VM load management?",
            choice1: "When load increases, new VMs should be scheduled to new nodes.",
            choice2: "When load decreases, use WOL to start up waiting nodes.",
            choice3: "When load increases, use WOL to start up waiting nodes.",
            choice4: "When load decreases, live migrate VMs to more utilized nodes.",
            answer: [1, 3, 4]
          },
          {
            question: "Select the correct statement(s) regarding the value(s) of (total-cost/effective-hour) for both the options.",
            choice1: "Total-cost / Effective-hour for in-house server is 81.42 INR over three years.",
            choice2: "Total-cost / Effective-hour for cloud server is 42 INR.",
            choice3: "Total-cost / Effective-hour for in-house server is 46.42 INR over three years.",
            choice4: "Total-cost / Effective-hour for cloud server is 40 INR.",
            answer: [2, 3]
          },
          {
            question: "What are the possible value(s) of T that SLA negotiation gets honored in terms of service availability?",
            choice1: "3 hours",
            choice2: "6 hours",
            choice3: "12 hours",
            choice4: "8 hours",
            answer: 1
          },
          {
            question: "Which of the following is/are objective(s) of Resource Management?",
            choice1: "Increased latency",
            choice2: "Scalability",
            choice3: "Improved throughput",
            choice4: "Improved security",
            answer: [2, 3]
          },
          {
            question: "Which of the following is/are resource allocation approaches in resource management?",
            choice1: "Energy-aware resource allocation",
            choice2: "Reinforcement learning guided control policy",
            choice3: "Network queueing model",
            choice4: "Intelligent multi-agent model",
            answer: [1, 4]
          },
          {
            question: "Statement 1: Each reducer groups the results of the map step using different keys and performs a function f on the list of values that correspond to these keys. Statement 2: Files are sorted by a key and stored to the local file system.",
            choice1: "Statement 1 is TRUE and Statement 2 is FALSE",
            choice2: "Statement 2 is TRUE and Statement 1 is FALSE",
            choice3: "Both statements are TRUE",
            choice4: "Both statements are FALSE",
            answer: 2
          },
          {
            question: "In computing, there is a nonlinear relationship between the number of processing cores used and power consumption",
            choice1: "TRUE",
            choice2: "FALSE",
            choice3: "",
            choice4: "",
            answer: 1
          }
        ],
        6: [
          {
            question: "Modification is an attack on:",
            choice1: "Authenticity",
            choice2: "Integrity",
            choice3: "Confidentiality",
            choice4: "Availability",
            answer: 2
          },
          {
            question: "Which of the following is/are example(s) of passive attack?",
            choice1: "Replay",
            choice2: "Denial of service",
            choice3: "Traffic analysis",
            choice4: "Masquerade",
            answer: 3
          },
          {
            question: "Which of the following is/are the recovery goal(s) of the security mechanism?",
            choice1: "Prevent attackers from violating security policy",
            choice2: "Detect attackers’ violation of security policy",
            choice3: "Stop attack, assess and repair damage",
            choice4: "Continue to function correctly even if attack succeeds",
            answer: [3, 4]
          },
          {
            question: "Statement I: Authorization is the identification of legitimate users. Statement II: Integrity is the protection against data alteration/corruption.",
            choice1: "Statement I is TRUE and statement II is FALSE.",
            choice2: "Statement I is FALSE and statement II is TRUE.",
            choice3: "Both statements are TRUE.",
            choice4: "Both statements are FALSE.",
            answer: 2
          },
          {
            question: "Which of the following is/are hypervisor risks associated with rogue hypervisor rootkits?",
            choice1: "Vulnerable virtual machine applications like Vmchat, VMftp, Vmcat etc.",
            choice2: "Hypervisor that hides itself from normal malware detection systems",
            choice3: "Improper configuration of VM.",
            choice4: "Hypervisor that creates a covert channel to dump unauthorized code.",
            answer: [2, 4]
          },
          {
            question: "1. Injection attack (a) Attacker sending huge amounts of requests to a certain service and causing denial of service. 2. Flooding (b) Browser-based security issues. 3. Metadata (WSDL) spoofing attack (c) Introduce malicious code to change the course of execution. (d) Malicious reengineering of Web Services’ metadata description.",
            choice1: "1-(a), 2-(b), 3-(d)",
            choice2: "1-(c), 2-(a), 3-(d)",
            choice3: "1-(b), 2-(c), 3-(d)",
            choice4: "1-(a), 2-(c), 3-(d)",
            answer: 2
          },
          {
            question: "Recovery Time Objective (RTO) represents the period of time allowed for the complete execution of the task.",
            choice1: "TRUE",
            choice2: "FALSE",
            choice3: "",
            choice4: "",
            answer: 2
          },
          {
            question: "Which of the following Open-source tools is/are used to perform TCP connect probes on the Amazon EC2 platform?",
            choice1: "nmap",
            choice2: "wget",
            choice3: "ipconfig",
            choice4: "hping",
            answer: 1
          },
          {
            question: "In para virtualization, VMs interact with the host OS.",
            choice1: "TRUE",
            choice2: "FALSE",
            choice3: "",
            choice4: "",
            answer: 1
          },
          {
            question: "In conflict removal, when is introduction of a virtual role required?",
            choice1: "In case of violation of SoD constraint violation.",
            choice2: "In case of cyclic inheritance conflict where exactly matched role set exists.",
            choice3: "In case of cyclic inheritance conflict where no exactly matched role set exists.",
            choice4: "None of the above.",
            answer: 3
          }
        ],
        7: [
          {
            question: "Which of the following is/are key requirement(s) of Mobile Cloud Computing?",
            choice1: "Simple APIs offering access to mobile services",
            choice2: "Internet access to remotely stored applications in the cloud",
            choice3: "Sophisticated APIs requiring knowledge of underlying network technologies",
            choice4: "Web interface",
            answer: [1, 2, 4]
          },
          {
            question: "In Mobile Cloud Computing, the synchronizer module collects results of split execution and combines them, and makes the execution details transparent to the user.",
            choice1: "TRUE",
            choice2: "FALSE",
            choice3: "",
            choice4: "",
            answer: 1
          },
          {
            question: "Geographical distribution of server nodes is _________ in Fog Computing and __________ in Cloud Computing.",
            choice1: "Distributed, Centralized",
            choice2: "Distributed, Distributed",
            choice3: "Centralized, Distributed",
            choice4: "Centralized, Centralized",
            answer: 1
          },
          {
            question: "Formulate the amount of energy saved (E) during offloading for the given data.",
            choice1: "E = C2*(k/Sm) - C1*(k/Sc) - C3*(D/B)",
            choice2: "E = C1*(k/Sm) - C2*(k/Sc) - C3*(D/B)",
            choice3: "E = C3*(k/Sm) - C2*(k/Sc) - C1*(D/B)",
            choice4: "E = C1*(k/Sc) - C2*(k/Sm) - C3*(D/B)",
            answer: 2
          },
          {
            question: "Which of the following is/are not a benefit of Fog computing?",
            choice1: "Location awareness",
            choice2: "Higher latency as compared to cloud computing",
            choice3: "Improved QoS",
            choice4: "Man-in-the-middle-attack",
            answer: [2, 4]
          },
          {
            question: "Population of a city/town is a static geographic information.",
            choice1: "TRUE",
            choice2: "FALSE",
            choice3: "",
            choice4: "",
            answer: 2
          },
          {
            question: "Which of the following statement(s) is/are FALSE about Fog Computing?",
            choice1: "Intelligence is brought to the cloud from the end users.",
            choice2: "Fog computing is used for real-time applications",
            choice3: "Fog nodes’ response time is higher than cloud server",
            choice4: "Network routers, WiFi Gateways will be capable of running applications",
            answer: [1, 3]
          },
          {
            question: "Fog Computing has ________ number of server nodes and has ________ delay jitter compared to Cloud Computing.",
            choice1: "small, higher",
            choice2: "large, higher",
            choice3: "small, lower",
            choice4: "large, lower",
            answer: 4
          },
          {
            question: "In Geospatial Cloud Models, which level of interoperability ensures the ability to “consume” the information?",
            choice1: "Service Level Interoperability",
            choice2: "Security Level Interoperability",
            choice3: "Data Level Interoperability",
            choice4: "None of the above",
            answer: 3
          },
          {
            question: "Consider the statements and select the correct answer: Statement I: In Geospatial cloud, data services in cloud can be run through IaaS service model. Statement II: Web service is the key technology to provide Geospatial services.",
            choice1: "Statement 1 is correct but Statement 2 is incorrect",
            choice2: "Statement 2 is correct but Statement 1 is incorrect",
            choice3: "Both the statements are correct",
            choice4: "Both the statements are incorrect.",
            answer: 2
          }
        ],
        8: [
          {
            question: "Docker compose is a tool for defining and running multi-container Docker applications.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 1
          },
          {
            question: "Choose the most appropriate option. Statement 1: An image is a lightweight, stand-alone, executable package that includes everything to run a piece of software. Statement 2:Container is a run time instance of an image.",
            choice1: "Statement 1 is correct but Statement 2 is incorrect",
            choice2: "Statement 2 is correct but Statement 1 is incorrect",
            choice3: "Both the statements are correct",
            choice4: "Both the statements are incorrect.",
            answer: 3
          },
          {
            question: "Vehicles providing their networking and data processing capabilities to other vehicles through the cloud comes under which service of IoT-based Vehicular Data Clouds.",
            choice1: "SaaS",
            choice2: "PaaS",
            choice3: "IaaS",
            choice4: "None of these",
            answer: 3
          },
          {
            question: "An IoT platform’s basic building blocks is/ are (choose the correct option(s)).",
            choice1: "Gateway",
            choice2: "Images",
            choice3: "Network and Cloud",
            choice4: "Containers",
            answer: [1, 3]
          },
          {
            question: "In the context of Green Cloud Computing, the Power Usage Effectiveness is defined as",
            choice1: "Power Delivered / Overall Power",
            choice2: "Overall Power / Power Delivered",
            choice3: "Overall Power * Power Delivered",
            choice4: "None of these",
            answer: 2
          },
          {
            question: "Statement 1: Sensor-Cloud proxy exposes sensor resources as cloud services. Statement 2: Sensor network is still managed from the Sensor-Cloud Interface via Sensor Network Proxy",
            choice1: "Statement 1 is True and Statement 2 is False",
            choice2: "Statement 2 is True and Statement 1 is False",
            choice3: "Both statements are True",
            choice4: "Both statements are False",
            answer: 3
          },
          {
            question: "Which of the following statements is/are true about Docker ? Statement 1: Docker hub is used for building docker images and creating docker containers. Statement 2: Docker compose is a registry used to host various docker images.",
            choice1: "Statement 1 is correct but Statement 2 is incorrect",
            choice2: "Statement 2 is correct but Statement 1 is incorrect",
            choice3: "Both the statements are correct",
            choice4: "Both the statements are incorrect.",
            answer: 4
          },
          {
            question: "Sensor data can be easily shared by different groups of users without any extra effort/ measure.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 2
          },
          {
            question: "___________ get virtual access to host resources through a hypervisor.",
            choice1: "Containers",
            choice2: "Virtual machines",
            choice3: "Both a and b",
            choice4: "Images",
            answer: 2
          },
          {
            question: "__________ enables different networks, spreads in a huge geographical area to connect together and be employed simultaneously by multiple users on demand.",
            choice1: "Serverless",
            choice2: "IoT Cloud",
            choice3: "Sensor Cloud",
            choice4: "Green Cloud",
            answer: 3
          }
        ],
        9: [
          {
            question: "In which of the following architectures, two or more partner clouds interoperate to aggregate their resources and provide users with a larger virtual infrastructure?",
            choice1: "Hybrid/Bursting Architecture",
            choice2: "Aggregated Architecture",
            choice3: "Broker Architecture",
            choice4: "Multiplier Architecture",
            answer: 2
          },
          {
            question: "Select the correct statement(s) regarding offloading.",
            choice1: "Offloading is a technique in which a server, an application, and the associated data are moved from the edge to the cloud.",
            choice2: "Offloading augments the computing requirements of individuals or a collection of user devices.",
            choice3: "Offloading from cloud to the edge can be achieved by server offloading.",
            choice4: "Offloading from user device to edge can be achieved by application partitioning.",
            answer: [2, 3, 4]
          },
          {
            question: "Fog computing is a model in which data, processing and applications are concentrated in devices at the network edge rather than existing almost entirely in the cloud.",
            choice1: "fog",
            choice2: "local node",
            choice3: "network station",
            choice4: "network edge",
            answer: 4
          },
          {
            question: "According to the service placement taxonomy in fog-edge computing, which of the following can be classified as online vs offline?",
            choice1: "Control plan design",
            choice2: "Placement characteristic",
            choice3: "System dynamicity",
            choice4: "Mobility support",
            answer: 2
          },
          {
            question: "Fog infrastructure consisting of IoT devices, Fog Nodes, and at least one Cloud Data Center never ensures scalability",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 2
          },
          {
            question: "Cloud Federation should prefer maximum geographical separation.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 1
          },
          {
            question: "In which of the following cloud federation architectures, creation of cross-site networks and cross-site migration of VMs are used?",
            choice1: "Loosely coupled federation",
            choice2: "Partially coupled federation",
            choice3: "Tightly coupled federation",
            choice4: "None of the above",
            answer: 3
          },
          {
            question: "What is(are) the application placement constraint(s) for fog nodes?",
            choice1: "Network constraints",
            choice2: "Interoperability",
            choice3: "Resource constraints",
            choice4: "None of these",
            answer: [1, 3]
          },
          {
            question: "The architectures used for resource management in fog/edge computing are classified on the basis of data flow, control and tenancy.",
            choice1: "Algorithms",
            choice2: "Architectures",
            choice3: "Hardware",
            choice4: "Infrastructure",
            answer: 2
          },
          {
            question: "A CSP has little or no control over remote resources in case of",
            choice1: "Tightly Coupled Federation",
            choice2: "Medium Coupled Federation",
            choice3: "Loosely Coupled Federation",
            choice4: "None of these",
            answer: 3
          }
        ],
        10: [
          {
            question: "Post-copy and Pre-copy migration approaches are employed in :",
            choice1: "Live Migration process",
            choice2: "Non-live Migration process",
            choice3: "Hybrid Migration process",
            choice4: "None of these",
            answer: 1
          },
          {
            question: "Kubernetes operates at the hardware level.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 2
          },
          {
            question: "What is(are) the key advantage(s) of Docker?",
            choice1: "Facilitating microservices",
            choice2: "Modeling networks.",
            choice3: "Packaging software",
            choice4: "None of these",
            answer: [1, 2, 3]
          },
          {
            question: "Which of the following statements is most appropriate about Docker ?",
            choice1: "Docker is a platform that allows to build and run but not ship apps.",
            choice2: "Docker is a platform that allows to build and ship but but not to run apps.",
            choice3: "Docker is a platform that allows to build, ship and, run apps.",
            choice4: "Docker is a platform that only allows to ship and run but not to build apps.",
            answer: 3
          },
          {
            question: "In Docker utility, ___________ is a collection of filesystem layers and some metadata that, if taken together, can be spun up as Docker containers.",
            choice1: "Operating System",
            choice2: "Microservice",
            choice3: "Virtual Machine",
            choice4: "Image",
            answer: 4
          },
          {
            question: "Containers are similar to VMs but they have unrelaxed isolation properties to share the operating system among the applications.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 2
          },
          {
            question: "Choose the most appropriate option. Statement 1: Container is a lightweight virtualization technique. Statement 2: Container contains the code and all its dependencies.",
            choice1: "Only statement 1 is true",
            choice2: "Only statement 2 is true",
            choice3: "Both statement 1 and 2 are true",
            choice4: "Bothe the statements are false",
            answer: 3
          },
          {
            question: "Private Docker registry is a service that stores Docker images.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 1
          },
          {
            question: "Docker builds offer enhanced reproducibility and replicability compared to conventional software development approaches.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 1
          },
          {
            question: "Given the VM memory size of 1024 GB and the transmission rate of 16 MB/sec What are the total migration time and downtime for non-live VM migration? Choose the most appropriate option.",
            choice1: "20 hours, 25 hours",
            choice2: "18 hours,18 hours",
            choice3: "16 hours, 16 hours",
            choice4: "24 hours,20 hours",
            answer: 2
          }
        ],
        11: [
          {
            question: "Which of the following options is most appropriate for FaaS ? Statement 1: Each function in the FaaS platform gets unlimited execution time. Statement 2: Functions are always active and ready for execution.",
            choice1: "Statement 1 is correct but Statement 2 is incorrect.",
            choice2: "Statement 2 is correct but Statement 1 is incorrect.",
            choice3: "Both the statements are correct.",
            choice4: "Both the statements are incorrect.",
            answer: 4
          },
          {
            question: "BigQuery is a fully-managed, serverless data warehouse by _____________.",
            choice1: "AWS",
            choice2: "Google",
            choice3: "Microsoft",
            choice4: "IBM",
            answer: 2
          },
          {
            question: "_________are an important distribution mechanism for libraries and custom runtimes in AWS serverless ecosystem.",
            choice1: "Runtimes",
            choice2: "Lambda Layers",
            choice3: "Log streams",
            choice4: "None of these",
            answer: 2
          },
          {
            question: "Which of the following is not a category of research initiative on sustainable cloud computing?",
            choice1: "Renewable Energy",
            choice2: "Capacity planning",
            choice3: "Environment Sandboxing",
            choice4: "None of these",
            answer: 3
          },
          {
            question: "AWS S3 is a fully managed proprietary NoSQL database service that supports key–value and document data structures and is offered by Amazon.com as part of the Amazon Web Services portfolio.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 2
          },
          {
            question: "Which of the following is/are the goal of sustainable cloud computing? Choose appropriate option(s).",
            choice1: "Minimizing the energy consumption.",
            choice2: "Increasing reliability of CDCs.",
            choice3: "Maximizing carbon footprint related cost.",
            choice4: "Increasing network traffic",
            answer: [1, 2]
          },
          {
            question: "Runtimes allows you to annotate your function code with custom logging statements which helps you to analyse the execution flow and performance of your AWS Lambda functions.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 2
          },
          {
            question: "Serverless covers a wide range of technologies that can be grouped into two categories",
            choice1: "BaaS and YaaS",
            choice2: "FaaS and BaaS",
            choice3: "FaaS and YaaS",
            choice4: "None of these",
            answer: 2
          },
          {
            question: "Which of the following is/are challenges in serverless computing ?",
            choice1: "Functions sharing code",
            choice2: "Asynchronous calls",
            choice3: "Adoption of too many technologies",
            choice4: "All of the above",
            answer: 4
          },
          {
            question: "The focus of cloud computing was _________ and the serverless is __________.",
            choice1: "programmers, system administrators",
            choice2: "system administrators, programmers",
            choice3: "",
            choice4: "",
            answer: 2
          }
        ],
        12: [
          {
            question: "The health model is designed for fog-edge computing aims to reduce",
            choice1: "Network usage",
            choice2: "Demand aggregation",
            choice3: "Latency",
            choice4: "Cost",
            answer: [1, 2, 4]
          },
          {
            question: "Spatial analysis is an attempt to solve ____________ oriented problems",
            choice1: "Latency",
            choice2: "Location",
            choice3: "Storage",
            choice4: "Temporal",
            answer: 2
          },
          {
            question: "The key aspect of the intelligent transportation system is efficient _____________.",
            choice1: "cost",
            choice2: "latency",
            choice3: "mobility",
            choice4: "delivery",
            answer: 3
          },
          {
            question: "What is(are) the benefit(s) of 5G technology for enhanced mobile broadband?",
            choice1: "Lower cost-per-bit",
            choice2: "Slower data rates",
            choice3: "Higher latency",
            choice4: "Limited device compatibility",
            answer: 1
          },
          {
            question: "________________ is a paradigm where on-premises computers provide functionality that is independent of cloud services and is also collaborative with cloud services",
            choice1: "Distributed computing",
            choice2: "Edge computing",
            choice3: "Dew computing",
            choice4: "Fog computing",
            answer: 3
          },
          {
            question: "Resource-constrained low-latency devices drive the need of",
            choice1: "Homogeneous and distributed computing architectures",
            choice2: "Heterogeneous and parallel computing architectures",
            choice3: "Homogeneous and parallel computing architectures",
            choice4: "Heterogeneous and distributed computing architectures",
            answer: 4
          },
          {
            question: "Spatial cloud supports _________resource pooling which is useful for participating organizations with common goals.",
            choice1: "shared",
            choice2: "partitioned",
            choice3: "stand-alone",
            choice4: "None of the above",
            answer: 1
          },
          {
            question: "The key features of Mobile Cloud Computing (MCC) for 5G networks include",
            choice1: "Reliability improvement",
            choice2: "Sharing of resources",
            choice3: "Offloading data processing",
            choice4: "Mitigating network traffic congestion",
            answer: [1, 2, 3]
          },
          {
            question: "Customized wearable devices for collecting health parameters are the best examples of",
            choice1: "IoHT",
            choice2: "Fog device",
            choice3: "Fog-Cloud interfaced.",
            choice4: "Cloud-Fog-Edge-IoHT",
            answer: 4
          },
          {
            question: "The cyber-physical system involves transdisciplinary approaches, merging the theory of cybernetics, mechatronics, design, and process science.",
            choice1: "True",
            choice2: "False",
            choice3: "",
            choice4: "",
            answer: 1
          }
        ]
      };
      

// DOM elements
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    // Initialize the application
    initApp();
});

function initApp() {
    console.log("Initializing app...");
    
    // Hide all sections except home
    document.querySelectorAll('section').forEach(section => {
        if (section.id !== 'home-section') {
            section.classList.add('hidden');
        }
    });

    // Set up event listeners for week buttons
    setupWeekButtons();
    
    // Set up event listeners for special practice buttons
    setupSpecialPracticeButtons();
    
    // Set up event listeners for navigation buttons
    setupNavigationButtons();
    
    // Set up event listeners for quiz interface
    setupQuizInterface();
}

function setupWeekButtons() {
    console.log("Setting up week buttons...");
    const weekButtons = document.querySelectorAll('.week-btn');
    console.log(`Found ${weekButtons.length} week buttons`);
    
    weekButtons.forEach(button => {
        button.addEventListener('click', function() {
            const weekNum = parseInt(this.dataset.week);
            console.log(`Week ${weekNum} button clicked`);
            startWeeklyQuiz(weekNum);
        });
    });
}

function setupSpecialPracticeButtons() {
    // All Questions button
    const allQuestionsBtn = document.getElementById('all-questions-btn');
    if (allQuestionsBtn) {
        allQuestionsBtn.addEventListener('click', function() {
            startSpecialQuiz('all');
        });
    }
    
    // PYQ Set 1 button
    const pyqSet1Btn = document.getElementById('pyq-set1-btn');
    if (pyqSet1Btn) {
        pyqSet1Btn.addEventListener('click', function() {
            startSpecialQuiz('pyq1');
        });
    }
    
}

function startSpecialQuiz(type) {
    console.log(`Starting special quiz: ${type}`);
    
    switch(type) {
        case 'all':
            quizMode = 'all';
            currentQuiz = {
                title: 'All Questions',
                questions: allQuestions
            };
            break;
        case 'pyq1':
            quizMode = 'pyq1';
            currentQuiz = {
                title: 'Previous Year Questions - Set 1',
                questions: pyqSet1
            };
            break;
        case 'pyq2':
            quizMode = 'pyq2';
            currentQuiz = {
                title: 'Previous Year Questions - Set 2',
                questions: pyqSet2
            };
            break;
    }
    
    if (!currentQuiz.questions || currentQuiz.questions.length === 0) {
        alert(`No questions available for ${currentQuiz.title}`);
        return;
    }
    
    startQuiz();
}


function setupNavigationButtons() {
    // Back to Selection button
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            goToHome();
        });
    } else {
        console.error("Back button not found");
    }
    
    // Home button
    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) {
        homeBtn.addEventListener('click', function() {
            goToHome();
        });
    } else {
        console.error("Home button not found");
    }
    
    // Results section buttons
    const reviewBtn = document.getElementById('review-btn');
    if (reviewBtn) {
        reviewBtn.addEventListener('click', function() {
            showReview();
        });
    }
    
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            startQuiz();
            document.getElementById('results-section').classList.add('hidden');
            document.getElementById('quiz-section').classList.remove('hidden');
        });
    }
    
    const goHomeBtn = document.getElementById('go-home');
    if (goHomeBtn) {
        goHomeBtn.addEventListener('click', function() {
            goToHome();
            document.getElementById('results-section').classList.add('hidden');
        });
    }
    
    const closeReviewBtn = document.getElementById('close-review-btn');
    if (closeReviewBtn) {
        closeReviewBtn.addEventListener('click', function() {
            document.getElementById('review-section').classList.add('hidden');
            document.getElementById('results-section').classList.remove('hidden');
        });
    }
}

function setupQuizInterface() {
    // Option buttons
    const options = document.querySelectorAll('.option');
    if (options.length > 0) {
        options.forEach(option => {
            option.addEventListener('click', function() {
                selectOption(this);
            });
        });
    } else {
        console.error("No option elements found");
    }
    
    // Submit button
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            submitAnswer();
        });
    } else {
        console.error("Submit button not found");
    }
    
    // Next button
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextQuestion();
        });
    } else {
        console.error("Next button not found");
    }
    
    // Submit test button
    const submitTestBtn = document.getElementById('submit-test-btn');
    if (submitTestBtn) {
        submitTestBtn.addEventListener('click', function() {
            if (!document.getElementById('submit-btn').disabled) {
                submitAnswer();
            }
            finishQuiz();
        });
    } else {
        console.error("Submit test button not found");
    }
}

function startWeeklyQuiz(weekNum) {
    console.log(`Starting weekly quiz for week ${weekNum}`);
    quizMode = 'weekly';
    
    // Check if weeklyQuestions[weekNum] exists
    if (!weeklyQuestions[weekNum] || weeklyQuestions[weekNum].length === 0) {
        alert(`No questions available for Week ${weekNum}`);
        return;
    }
    
    currentQuiz = {
        title: `Week ${weekNum} Practice`,
        questions: weeklyQuestions[weekNum]
    };
    
    startQuiz();
}

function startSpecialQuiz(type) {
    console.log(`Starting special quiz: ${type}`);
    
    switch(type) {
        case 'all':
            quizMode = 'all';
            currentQuiz = {
                title: 'All Questions',
                questions: allQuestions
            };
            break;
        case 'pyq1':
            quizMode = 'pyq1';
            // Convert pyqSet1 object to array of questions
            let pyq1Questions = [];
            for (const week in pyqSet1) {
                pyqSet1[week].forEach(question => {
                    pyq1Questions.push({...question, week: parseInt(week)});
                });
            }
            currentQuiz = {
                title: 'Previous Year Questions - Set 1',
                questions: pyq1Questions
            };
            break;
        case 'pyq2':
            quizMode = 'pyq2';
            // Convert pyqSet2 object to array of questions
            let pyq2Questions = [];
            for (const week in pyqSet2) {
                pyqSet2[week].forEach(question => {
                    pyq2Questions.push({...question, week: parseInt(week)});
                });
            }
            currentQuiz = {
                title: 'Previous Year Questions - Set 2',
                questions: pyq2Questions
            };
            break;
    }
    
    if (!currentQuiz.questions || currentQuiz.questions.length === 0) {
        alert(`No questions available for ${currentQuiz.title}`);
        return;
    }
    
    startQuiz();
}

function startQuiz() {
    console.log("Starting quiz...");
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = [];
    userAnswers = [];
    quizStarted = true;
    
    // Prepare questions based on mode
    currentQuestions = [...currentQuiz.questions];
    
    // Update UI
    const quizTitleElement = document.getElementById('quiz-title');
    if (quizTitleElement) {
        quizTitleElement.textContent = currentQuiz.title;
    }
    
    const totalQuestionsElements = document.querySelectorAll('#total-questions, #total-questions-main, #total-questions-progress');
    totalQuestionsElements.forEach(element => {
        if (element) {
            element.textContent = currentQuestions.length;
        }
    });
    
    // Generate question navigation buttons
    generateQuestionNavButtons();
    
    // Show quiz section, hide others
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
    });
    
    const quizSection = document.getElementById('quiz-section');
    if (quizSection) {
        quizSection.classList.remove('hidden');
    } else {
        console.error("Quiz section not found");
        return;
    }
    
    // Start timer
    startTimer();
    
    // Load first question
    loadQuestion(0);
}

function generateQuestionNavButtons() {
    const navContainer = document.getElementById('questions-nav');
    if (!navContainer) {
        console.error("Questions navigation container not found");
        return;
    }
    
    navContainer.innerHTML = '';
    
    for (let i = 0; i < currentQuestions.length; i++) {
        const btn = document.createElement('button');
        btn.classList.add('question-nav-btn');
        btn.textContent = i + 1;
        btn.dataset.index = i;
        
        btn.addEventListener('click', function() {
            navigateToQuestion(parseInt(this.dataset.index));
        });
        
        navContainer.appendChild(btn);
    }
}

function startTimer() {
    clearInterval(timer);
    timeLeft = totalTime;
    updateTimerDisplay();
    
    timer = setInterval(function() {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            finishQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    const timerElements = document.querySelectorAll('#timer-display, #sidebar-timer, #main-timer');
    timerElements.forEach(element => {
        if (element) {
            element.textContent = formattedTime;
        }
    });
}

function loadQuestion(index) {
    console.log(`Loading question ${index + 1}`);
    
    if (index < 0 || index >= currentQuestions.length) {
        console.error('Invalid question index');
        return;
    }
    
    currentQuestionIndex = index;
    const question = currentQuestions[index];
    
    // Update question display
    const questionNumberElements = document.querySelectorAll('#question-number, #current-question');
    questionNumberElements.forEach(element => {
        if (element) {
            element.textContent = index + 1;
        }
    });
    
    const questionTextElement = document.getElementById('question-text');
    if (questionTextElement) {
        questionTextElement.textContent = question.question;
    } else {
        console.error("Question text element not found");
        return;
    }
    
    // Update options
    const options = document.querySelectorAll('.option');
    options.forEach((option, i) => {
        const choiceKey = `choice${i+1}`;
        const optionText = question[choiceKey];
        
        // If option text is empty (for true/false questions), hide the option
        if (optionText === '') {
            if (option.parentElement) {
                option.parentElement.classList.add('hidden');
            }
        } else {
            if (option.parentElement) {
                option.parentElement.classList.remove('hidden');
            }
            
            const optionTextElement = option.querySelector('.option-text');
            if (optionTextElement) {
                optionTextElement.textContent = optionText;
            }
            
            option.dataset.optionIndex = i + 1;
        }
        
        // Reset selection state
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Restore any previous selections for this question
    if (selectedAnswers[index]) {
        selectedAnswers[index].forEach(answerIndex => {
            const option = document.querySelector(`.option[data-option-index="${answerIndex}"]`);
            if (option) {
                option.classList.add('selected');
            }
        });
    } else {
        selectedAnswers[index] = [];
    }
    
    // Update navigation buttons
    updateQuestionNavButtons();
    
    // Update completion percentage
    updateCompletionPercentage();
    
    // Reset button states
    const submitBtn = document.getElementById('submit-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (userAnswers[index]) {
        // Already answered
        if (submitBtn) submitBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = false;
        
        // Show the correct/incorrect feedback
        showAnswerFeedback(index);
    } else {
        if (submitBtn) submitBtn.disabled = false;
        if (nextBtn) nextBtn.disabled = true;
        
        // Re-enable options
        document.querySelectorAll('.option').forEach(option => {
            option.style.pointerEvents = 'auto';
        });
    }
}

function showAnswerFeedback(index) {
    const question = currentQuestions[index];
    const userSelected = selectedAnswers[index] || [];
    const correctAnswers = Array.isArray(question.answer) ? question.answer : [question.answer];
    
    document.querySelectorAll('.option').forEach((option, i) => {
        const optionIndex = i + 1;
        
        if (correctAnswers.includes(optionIndex)) {
            option.classList.add('correct');
        } else if (userSelected.includes(optionIndex)) {
            option.classList.add('incorrect');
        }
        
        // Disable options
        option.style.pointerEvents = 'none';
    });
}

function updateQuestionNavButtons() {
    const navButtons = document.querySelectorAll('.question-nav-btn');
    navButtons.forEach((btn, index) => {
        btn.classList.remove('current', 'answered', 'correct', 'incorrect');
        
        if (index === currentQuestionIndex) {
            btn.classList.add('current');
        }
        
        if (userAnswers[index]) {
            if (userAnswers[index].correct) {
                btn.classList.add('correct');
            } else {
                btn.classList.add('incorrect');
            }
        } else if (selectedAnswers[index] && selectedAnswers[index].length > 0) {
            btn.classList.add('answered');
        }
    });
}

function updateCompletionPercentage() {
    const answeredCount = selectedAnswers.filter(answers => answers && answers.length > 0).length;
    const percentage = Math.round((answeredCount / currentQuestions.length) * 100);
    
    const completionPercentageElement = document.getElementById('completion-percentage');
    if (completionPercentageElement) {
        completionPercentageElement.textContent = `${percentage}%`;
    }
    
    const progressBarElement = document.getElementById('progress-bar');
    if (progressBarElement) {
        progressBarElement.style.width = `${percentage}%`;
    }
}

function selectOption(optionElement) {
    const optionIndex = parseInt(optionElement.dataset.optionIndex);
    const question = currentQuestions[currentQuestionIndex];
    const isMultipleAnswer = Array.isArray(question.answer);
    
    if (isMultipleAnswer) {
        // Toggle selection for multiple answer questions
        if (optionElement.classList.contains('selected')) {
            optionElement.classList.remove('selected');
            selectedAnswers[currentQuestionIndex] = selectedAnswers[currentQuestionIndex].filter(
                index => index !== optionIndex
            );
        } else {
            optionElement.classList.add('selected');
            selectedAnswers[currentQuestionIndex].push(optionIndex);
        }
    } else {
        // Single selection for single answer questions
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });
        optionElement.classList.add('selected');
        selectedAnswers[currentQuestionIndex] = [optionIndex];
        
        // Auto-advance to next question after a short delay for single-answer questions
        setTimeout(() => {
            submitAnswer();
            if (currentQuestionIndex < currentQuestions.length - 1) {
                nextQuestion();
            }
        }, 500);
    }
    
    updateQuestionNavButtons();
    updateCompletionPercentage();
}

function submitAnswer() {
    const question = currentQuestions[currentQuestionIndex];
    const userSelected = selectedAnswers[currentQuestionIndex] || [];
    const correctAnswers = Array.isArray(question.answer) ? question.answer : [question.answer];
    
    // Check if answer is correct
    let isCorrect = false;
    
    if (userSelected.length === correctAnswers.length) {
        isCorrect = correctAnswers.every(answer => userSelected.includes(answer)) && 
                    userSelected.every(answer => correctAnswers.includes(answer));
    }
    
    // Store user answer and correctness
    userAnswers[currentQuestionIndex] = { selected: [...userSelected], correct: isCorrect };
    
    // Update nav button color
    updateQuestionNavButtons();
    
    // Show feedback
    document.querySelectorAll('.option').forEach((option, i) => {
        const optionIndex = i + 1;
        
        if (correctAnswers.includes(optionIndex)) {
            option.classList.add('correct');
        } else if (userSelected.includes(optionIndex)) {
            option.classList.add('incorrect');
        }
    });
    
    // Update score
    if (isCorrect) {
        score++;
    }
    
    // Update score display
    const scoreDisplayElement = document.getElementById('score-display');
    if (scoreDisplayElement) {
        scoreDisplayElement.textContent = score;
    }
    
    // Disable options
    document.querySelectorAll('.option').forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Enable next button
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.disabled = false;
    }
    
    // Disable submit button
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.disabled = true;
    }
}

function nextQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        loadQuestion(currentQuestionIndex + 1);
    } else {
        finishQuiz();
    }
}

function navigateToQuestion(index) {
    if (index >= 0 && index < currentQuestions.length) {
        loadQuestion(index);
    }
}

function finishQuiz() {
    console.log("Finishing quiz...");
    clearInterval(timer);
    quizStarted = false;
    
    // Calculate final score
    const finalScore = Math.round((score / currentQuestions.length) * 100);
    
    // Update results display
    const finalScoreElement = document.getElementById('final-score');
    if (finalScoreElement) {
        finalScoreElement.textContent = score;
    }
    
    const totalScoreElement = document.getElementById('total-score');
    if (totalScoreElement) {
        totalScoreElement.textContent = currentQuestions.length;
    }
    
    const scorePercentageElement = document.getElementById('score-percentage');
    if (scorePercentageElement) {
        scorePercentageElement.textContent = `${finalScore}%`;
    }
    
    // Create results summary
    const resultsSummary = document.getElementById('results-summary');
    if (resultsSummary) {
        resultsSummary.innerHTML = `
            <p>You scored ${score} out of ${currentQuestions.length} (${finalScore}%).</p>
            <p>Click "Review Answers" to see detailed feedback.</p>
        `;
    }
    
    // Show results section, hide quiz section
    const quizSection = document.getElementById('quiz-section');
    if (quizSection) {
        quizSection.classList.add('hidden');
    }
    
    const resultsSection = document.getElementById('results-section');
    if (resultsSection) {
        resultsSection.classList.remove('hidden');
    } else {
        console.error("Results section not found");
    }
}

function showReview() {
    const reviewSection = document.getElementById('review-section');
    const reviewList = document.getElementById('review-list');
    
    if (!reviewSection || !reviewList) {
        console.error("Review section or review list not found");
        return;
    }
    
    reviewList.innerHTML = '';

    currentQuestions.forEach((question, idx) => {
        const userAnswer = userAnswers[idx] ? userAnswers[idx].selected : [];
        const correctAnswer = Array.isArray(question.answer) ? question.answer : [question.answer];

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('review-question');

        const qText = document.createElement('h4');
        qText.textContent = `Q${idx + 1}: ${question.question}`;
        questionDiv.appendChild(qText);

        const ul = document.createElement('ul');

        for (let i = 1; i <= 4; i++) {
            if (question[`choice${i}`] && question[`choice${i}`].trim() !== '') {
                const li = document.createElement('li');
                li.textContent = question[`choice${i}`];

                if (correctAnswer.includes(i)) {
                    li.classList.add('correct');
                    li.textContent += ' (Correct Answer)';
                }

                if (userAnswer.includes(i) && !correctAnswer.includes(i)) {
                    li.classList.add('incorrect');
                    li.textContent += ' (Your Answer - Incorrect)';
                } else if (userAnswer.includes(i) && correctAnswer.includes(i)) {
                    li.classList.add('user-selected');
                    li.textContent += ' (Your Answer)';
                }

                ul.appendChild(li);
            }
        }

        questionDiv.appendChild(ul);
        reviewList.appendChild(questionDiv);
    });

    document.getElementById('results-section').classList.add('hidden');
    reviewSection.classList.remove('hidden');
}

function goToHome() {
    console.log("Going to home...");
    // Clear quiz state
    clearInterval(timer);
    quizStarted = false;
    
    // Show home section, hide others
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
    });
    
    const homeSection = document.getElementById('home-section');
    if (homeSection) {
        homeSection.classList.remove('hidden');
    } else {
        console.error("Home section not found");
    }
}

// Handle page unload/refresh
window.addEventListener('beforeunload', function(e) {
    if (quizStarted) {
        const message = 'You are in the middle of a quiz. Are you sure you want to leave?';
        e.returnValue = message;
        return message;
    }
});

// Create all questions array
const allQuestions = [];
for (const week in weeklyQuestions) {
    weeklyQuestions[week].forEach(question => {
        allQuestions.push({...question, week: parseInt(week)});
    });
}

// Assignment questions (same as all questions for now)
const assignmentQuestions = [...allQuestions];

