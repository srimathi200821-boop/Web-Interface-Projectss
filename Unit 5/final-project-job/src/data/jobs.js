// data.js
// Demo dataset for SkillBridge.
// In a production build this would come from a real backend / database.

export const CITIES = [
  "Chennai",
  "Bengaluru",
  "Hyderabad",
  "Mumbai",
  "Pune",
  "Delhi NCR",
  "Kolkata",
  "Ahmedabad",
  "Coimbatore",
  "Kochi",
  "Indore",
  "Chandigarh",
  "Jaipur",
  "Visakhapatnam",
  "Nagpur",
  "Bhubaneswar",
  "Remote",
];

// Area-level detail per city
const AREA = {
  Chennai: [
    "OMR, Chennai",
    "Guindy, Chennai",
    "Sholinganallur, Chennai",
    "Ambattur, Chennai",
  ],

  Bengaluru: [
    "Whitefield, Bengaluru",
    "Electronic City, Bengaluru",
    "Koramangala, Bengaluru",
    "Manyata Tech Park, Bengaluru",
  ],

  Hyderabad: [
    "HITEC City, Hyderabad",
    "Gachibowli, Hyderabad",
    "Madhapur, Hyderabad",
  ],

  Mumbai: [
    "Bandra Kurla Complex, Mumbai",
    "Powai, Mumbai",
    "Andheri East, Mumbai",
  ],

  Pune: [
    "Hinjewadi, Pune",
    "Kharadi, Pune",
    "Magarpatta, Pune",
  ],

  "Delhi NCR": [
    "Cyber City, Gurugram",
    "Sector 62, Noida",
    "Connaught Place, Delhi",
  ],

  Kolkata: [
    "Sector V, Salt Lake, Kolkata",
  ],

  Ahmedabad: [
    "SG Highway, Ahmedabad",
  ],

  Coimbatore: [
    "Peelamedu, Coimbatore",
    "ELCOT SEZ, Coimbatore",
  ],

  Kochi: [
    "Infopark, Kakkanad, Kochi",
  ],

  Indore: [
    "Crystal IT Park, Indore",
  ],

  Chandigarh: [
    "IT Park, Chandigarh",
  ],

  Jaipur: [
    "Sitapura, Jaipur",
  ],

  Visakhapatnam: [
    "Rushikonda IT SEZ, Visakhapatnam",
  ],

  Nagpur: [
    "MIHAN, Nagpur",
  ],

  Bhubaneswar: [
    "Infocity, Chandaka, Bhubaneswar",
  ],

  Remote: [
    "Remote / Work from home",
  ],
};

export const COMPANIES = [
  "TCS",
  "Infosys",
  "Wipro",
  "HCLTech",
  "Accenture",
  "Cognizant",
  "Capgemini",
  "IBM",
  "Google",
  "Microsoft",
  "Amazon",
  "Zoho",
  "Freshworks",
  "Flipkart",
  "Swiggy",
  "Ola",
  "Paytm",
  "Razorpay",
  "Tech Mahindra",
  "LTIMindtree",
  "Deloitte India",
];

const pick = (arr, i) => arr[i % arr.length];

/* =========================================================
   JOB ROLES
   ========================================================= */

const ROLE_TEMPLATES = [
  {
    title: "Software Engineer",
    type: "Full-time",
    exp: "0-1 yrs",
    skills: ["Java", "Data Structures", "SQL", "Git"],
  },

  {
    title: "Frontend Developer",
    type: "Full-time",
    exp: "0-2 yrs",
    skills: ["React", "JavaScript", "CSS", "HTML"],
  },

  {
    title: "Backend Developer",
    type: "Full-time",
    exp: "1-3 yrs",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
  },

  {
    title: "Full Stack Developer",
    type: "Full-time",
    exp: "1-3 yrs",
    skills: ["React", "Node.js", "SQL", "Git"],
  },

  {
    title: "Data Analyst",
    type: "Full-time",
    exp: "0-2 yrs",
    skills: ["Excel", "SQL", "Power BI", "Python"],
  },

  {
    title: "Data Scientist",
    type: "Full-time",
    exp: "1-3 yrs",
    skills: ["Python", "Pandas", "Machine Learning", "SQL"],
  },

  {
    title: "Machine Learning Intern",
    type: "Internship",
    exp: "Student",
    skills: ["Python", "Machine Learning", "NumPy"],
  },

  {
    title: "DevOps Engineer",
    type: "Full-time",
    exp: "2-4 yrs",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
  },

  {
    title: "Cloud Engineer",
    type: "Full-time",
    exp: "1-3 yrs",
    skills: ["AWS", "Azure", "Linux", "Networking"],
  },

  {
    title: "QA Engineer",
    type: "Full-time",
    exp: "0-2 yrs",
    skills: ["Manual Testing", "Selenium", "SQL", "JIRA"],
  },

  {
    title: "Mobile App Developer",
    type: "Full-time",
    exp: "1-3 yrs",
    skills: ["Kotlin", "Android SDK", "Java", "Git"],
  },

  {
    title: "UI/UX Designer",
    type: "Full-time",
    exp: "0-2 yrs",
    skills: ["Figma", "Wireframing", "User Research", "CSS"],
  },

  {
    title: "Business Analyst",
    type: "Full-time",
    exp: "1-3 yrs",
    skills: ["Excel", "SQL", "Communication", "Power BI"],
  },

  {
    title: "Product Manager",
    type: "Full-time",
    exp: "3-5 yrs",
    skills: ["Roadmapping", "SQL", "Communication", "Agile"],
  },

  {
    title: "Cybersecurity Analyst",
    type: "Full-time",
    exp: "1-3 yrs",
    skills: ["Networking", "Linux", "SIEM", "Python"],
  },

  {
    title: "HR Executive",
    type: "Full-time",
    exp: "0-2 yrs",
    skills: ["Communication", "Recruitment", "Excel"],
  },

  {
    title: "Digital Marketing Executive",
    type: "Full-time",
    exp: "0-2 yrs",
    skills: ["SEO", "Content Writing", "Analytics"],
  },

  {
    title: "Software Engineering Intern",
    type: "Internship",
    exp: "Student",
    skills: ["Java", "Git", "Data Structures"],
  },
];

/* =========================================================
   VERIFIED BRANCH / EXACT LOCATION DATA
   ========================================================= */

const LOCATION_OVERRIDES = {
  "Accenture|Chennai|Sholinganallur, Chennai": {
    branch: "Divyasree Point - Sholinganallur",

    address:
      "Divyasree Point, No. 7, Rajiv Gandhi Road (Old Mahabalipuram Road), Sholinganallur, Chennai, Tamil Nadu - 600119",

    landmark:
      "Divyasree Point, OMR",

    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Accenture+Divyasree+Point+Sholinganallur+Chennai+600119",

    exactLocation: true,
  },
};

/* =========================================================
   LOCATION HELPER
   ========================================================= */

function getLocationDetails(company, city, area) {
  const key = `${company}|${city}|${area}`;

  const exactLocation = LOCATION_OVERRIDES[key];

  if (exactLocation) {
    return exactLocation;
  }

  /*
    For locations that do not yet have a verified street address,
    we keep the area-level location and generate a Google Maps search.
  */

  const searchText = `${company} ${area}`;

  return {
    branch: `${company} - ${area.split(",")[0]}`,

    address: area,

    landmark: area,

    mapsUrl:
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        searchText
      )}`,

    exactLocation: false,
  };
}

/* =========================================================
   BUILD JOBS
   ========================================================= */

function buildJobs() {
  const jobs = [];

  let id = 1;

  ROLE_TEMPLATES.forEach((role, i) => {
    const company = pick(
      COMPANIES,
      i * 3 + 1
    );

    let city = pick(
      CITIES.filter((c) => c !== "Remote"),
      i * 2
    );

    let area = pick(
      AREA[city],
      i
    );

    /*
      Special realistic branch example:
      Accenture → Sholinganallur, Chennai
    */

    if (company === "Accenture") {
      city = "Chennai";
      area = "Sholinganallur, Chennai";
    }

    const locationDetails =
      getLocationDetails(
        company,
        city,
        area
      );

    const remoteVersion =
      i % 4 === 0;

    const baseSalary =
      3 + (i % 10);

    jobs.push({
      id: id++,

      title: role.title,

      company,

      city,

      location: area,

      /* NEW LOCATION DATA */

      branch:
        locationDetails.branch,

      address:
        locationDetails.address,

      landmark:
        locationDetails.landmark,

      mapsUrl:
        locationDetails.mapsUrl,

      exactLocation:
        locationDetails.exactLocation,

      /* JOB DATA */

      type: role.type,

      experience: role.exp,

      skills: role.skills,

      salary:
        `${baseSalary} - ${
          baseSalary + 4
        } LPA`,

      postedDaysAgo:
        (i % 6) + 1,

      description:
        `${company} is hiring a ${role.title} to join their team in ${area}. ` +
        `You will work on real products used by customers across India, alongside a ` +
        `mentorship-driven engineering culture.`,
    });

    /* =====================================================
       REMOTE VERSION
       ===================================================== */

    if (remoteVersion) {
      const remoteCompany =
        pick(
          COMPANIES,
          i * 5 + 2
        );

      const remoteLocation =
        "Remote / Work from home";

      const remoteDetails =
        getLocationDetails(
          remoteCompany,
          "Remote",
          remoteLocation
        );

      jobs.push({
        id: id++,

        title: role.title,

        company: remoteCompany,

        city: "Remote",

        location:
          remoteLocation,

        branch:
          remoteDetails.branch,

        address:
          remoteDetails.address,

        landmark:
          remoteDetails.landmark,

        mapsUrl:
          remoteDetails.mapsUrl,

        exactLocation:
          false,

        type: role.type,

        experience: role.exp,

        skills: role.skills,

        salary:
          `${baseSalary + 1} - ${
            baseSalary + 5
          } LPA`,

        postedDaysAgo:
          (i % 5) + 1,

        description:
          `Fully remote ${role.title} role. Own your schedule while collaborating ` +
          `with a distributed team across multiple Indian cities.`,
      });
    }
  });

  return jobs;
}

/* =========================================================
   MAIN JOB LIST
   ========================================================= */

export const JOBS = buildJobs();

/* =========================================================
   ALL SKILLS
   ========================================================= */

export const ALL_SKILLS =
  Array.from(
    new Set(
      JOBS.flatMap(
        (job) => job.skills
      )
    )
  ).sort();

/* =========================================================
   LIVE JOB GENERATOR
   ========================================================= */

let liveIdCounter = 9000;

export function generateLiveJob() {
  const role =
    ROLE_TEMPLATES[
      Math.floor(
        Math.random() *
          ROLE_TEMPLATES.length
      )
    ];

  const company =
    COMPANIES[
      Math.floor(
        Math.random() *
          COMPANIES.length
      )
    ];

  let city;

  let area;

  /*
    If live job is Accenture,
    also give it the Sholinganallur branch
    so the exact-location feature can be demonstrated.
  */

  if (company === "Accenture") {
    city = "Chennai";

    area =
      "Sholinganallur, Chennai";
  } else {
    const cityPool =
      CITIES.filter(
        (c) => c !== "Remote"
      );

    city =
      cityPool[
        Math.floor(
          Math.random() *
            cityPool.length
        )
      ];

    area =
      AREA[city][
        Math.floor(
          Math.random() *
            AREA[city].length
        )
      ];
  }

  const baseSalary =
    3 +
    Math.floor(
      Math.random() * 10
    );

  const locationDetails =
    getLocationDetails(
      company,
      city,
      area
    );

  return {
    id: liveIdCounter++,

    title: role.title,

    company,

    city,

    location: area,

    /* NEW LOCATION DATA */

    branch:
      locationDetails.branch,

    address:
      locationDetails.address,

    landmark:
      locationDetails.landmark,

    mapsUrl:
      locationDetails.mapsUrl,

    exactLocation:
      locationDetails.exactLocation,

    /* JOB DATA */

    type: role.type,

    experience: role.exp,

    skills: role.skills,

    salary:
      `${baseSalary} - ${
        baseSalary + 4
      } LPA`,

    postedDaysAgo: 0,

    isLive: true,

    description:
      `${company} just opened a ${role.title} role in ${area}. ` +
      `Apply early — new listings like this get the most attention in the first 48 hours.`,
  };
}

/* =========================================================
   JOB TYPES
   ========================================================= */

export const JOB_TYPES =
  Array.from(
    new Set(
      JOBS.map(
        (job) => job.type
      )
    )
  );