

export const countries = [
  {
    value: "Turkiye",
    label: "Turkiye",
    icon: (
      <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
        <span className="text-white text-xs font-bold">TR</span>
      </div>
    )
  },
  { value: "Germany", label: "Germany" },
  { value: "France", label: "France" },
  { value: "Italy", label: "Italy" }
];

export const cities = [
  { value: "Istanbul", label: "Istanbul" },
  { value: "Ankara", label: "Ankara" },
  { value: "Izmir", label: "Izmir" },
  { value: "Bursa", label: "Bursa" }
];

export const districts = [
  { value: "Kadikoy", label: "Kadikoy" },
  { value: "Besiktas", label: "Besiktas" },
  { value: "Sisli", label: "Sisli" },
  { value: "Uskudar", label: "Uskudar" }
];
export const tabs = [
  { name: "Task", hasIndicator: false },
  { name: "Mentions", hasIndicator: false },
  { name: "Schedule", hasIndicator: true },
];

export const employeesTabs = [
  { name: "Employee", hasIndicator: false },
  { name: "Evaluation", hasIndicator: false },
  { name: "Payment", hasIndicator: true },
];
 
export const columns = [
  {
    key: "taskName",
    label: "Name",
    render: (value) => value || "N/A",
  },
  {
    key: "dueDate",
    label: "Due Date",
    render: (value) => {
      if (!value) return "N/A";
      try {
        return new Date(value).toLocaleDateString();
      } catch {
        return value;
      }
    },
  },
  // {
  //   key: "title",
  //   label: "Title",
  //   render: (value) => value || "N/A",
  // },
  {
    key: "taskVisibility",
    label: "Task Visibility",
    render: (value) => {
      if (Array.isArray(value)) {
        return (
          value
            .map((v) => `${v.firstName || ""} ${v.lastName || ""}`.trim())
            .filter((name) => name) // remove empty strings
            .join(", ") || "N/A"
        );
      }

      if (value && typeof value === "object") {
        return (
          `${value.firstName || ""} ${value.lastName || ""}`.trim() || "N/A"
        );
      }

      return "N/A";
    },
  },
  {
    key: "assigner",
    label: "Assigner",
    render: (value) => value || "N/A",
  },
  {
    key: "assignedBy",
    label: "Assigned By",
    render: (value) => value || "N/A",
  },

  {
    key: "status",
    label: "Status",
    render: (value) => (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          value === "Incomplete"
            ? "bg-red-100 text-red-700"
            : value === "Complete"
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {value || "N/A"}
      </span>
    ),
  },
];

// meet columns 
export const meetColumns = [
  { key: "partnerName", label: "Partner Name" },
  {
    key: "taskVisibility",
    label: "Interviewed",
    render: (value) => {
      if (Array.isArray(value)) {
        return value
          .map((v) => `${v.firstName || ""} ${v.lastName || ""}`.trim())
          .filter((name) => name) // remove empty strings
          .join(", ") || "N/A";
      }

      if (value && typeof value === "object") {
        return `${value.firstName || ""} ${value.lastName || ""}`.trim() || "N/A";
      }

      return "N/A";
    },
  },
  { key: "gender", label: "Gender" },
  { key: "age", label: "Age" },
  { key: "phone", label: "Phone" },
  {
    key: "datetime", label: "Date",
    render: (value) => {
      if (!value) return "N/A";
      try {
        return new Date(value).toLocaleDateString();
      } catch {
        return value;
      }
    },

  },
  {
    key: "datetime",
    label: "Time",
    render: (value) => {
      if (!value) return "N/A";
      try {
        return new Date(value).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch {
        return value;
      }
    },
  },
  {
    key: "nextMeet",
    label: "Next Meet",
    render: (value) => {
      if (!value) return "N/A";
      try {
        return new Date(value).toLocaleDateString();
      } catch {
        return value;
      }
    },
  },
  { key: "address", label: "Address" },
  { key: "purpose", label: "Purpose" },
  { key: "status", label: "Status" },
];


// Add Appointment 

export const AddAppointment = [
  { key: `customerDetails.firstName`, label: "Name" },
  { key: "serviceName", label: "Service Name" },
  // { key: "gender", label: "Gender" },
  { key: "serviceCategory", label: "Category" },
  { key: "appointmentNo", label: "App no" },
  {
    key: "bookingDate",
    label: "Date",
    render: (value) => {
      if (!value) return "N/A";
      try {
        return new Date(value).toLocaleDateString();
      } catch {
        return value;
      }
    },
  },
  {
    key: "bookingTime",
    label: "Time",
    render: (value) => {
      if (!value) return "N/A";

      // If the value contains '-' (time range), return as-is
      if (value.includes("-")) return value;

      // Otherwise, try to format it (optional)
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      }

      return value; // fallback for any other string
    },
  },

  { key: `branchDetails.firstName`, label: "Partner" },
  { key: `branchDetails.city`, label: "City" },
  { key: `branchDetails.district`, label: "District" },
  { key: "price", label: "Price" },
];

export const Appointment = [
  {
    firstName: "Ali",
    lastName: "Khan",
    gender: "Male",
    category: "General",
    appNo: "APP-001",
    date: "2025-08-20T10:30:00Z", // ISO datetime
    time: "2025-08-20T10:30:00Z",
    partner: "ABC Corp",
    city: "Lahore",
    district: "Lahore",
    price: 2500,
  },
  {
    firstName: "Sara",
    lastName: "Malik",
    gender: "Female",
    category: "Premium",
    appNo: "APP-002",
    date: "2025-08-21T14:00:00Z",
    time: "2025-08-21T14:00:00Z",
    partner: "XYZ Pvt Ltd",
    city: "Karachi",
    district: "Karachi",
    price: 5000,
  },
  {
    firstName: "Hassan",
    lastName: "Raza",
    gender: "Male",
    category: "Standard",
    appNo: "APP-003",
    date: "2025-08-22T09:15:00Z",
    time: "2025-08-22T09:15:00Z",
    partner: "Tech Solutions",
    city: "Islamabad",
    district: "Islamabad",
    price: 3500,
  },
  {
    firstName: "Ayesha",
    lastName: "Iqbal",
    gender: "Female",
    category: "VIP",
    appNo: "APP-004",
    date: "2025-08-23T11:45:00Z",
    time: "2025-08-23T11:45:00Z",
    partner: "Innovate Ltd",
    city: "Multan",
    district: "Multan",
    price: 7500,
  },
];

export const AppointmentTabs = [
  { name: "Hair", hasIndicator: false },
  { name: "Beauty", hasIndicator: false },
  { name: "Massage", hasIndicator: false },
  // { name: "Requests ", hasIndicator: true },
];

// content/ContentData.js

export const countryOptions = [
  { value: "", label: "Choose a country" },
  { value: "TR", label: "Turkey" },
  { value: "US", label: "USA" },
  { value: "DE", label: "Germany" },
];

export const cityOptions = [
  { value: "", label: "Choose a city" },
  { value: "istanbul", label: "Istanbul" },
  { value: "ankara", label: "Ankara" },
  { value: "izmir", label: "Izmir" },
  { value: "berlin", label: "Berlin" },
  { value: "munich", label: "Munich" },
  { value: "hamburg", label: "Hamburg" },
  { value: "newyork", label: "New York" },
  { value: "losangeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
];
export const Category = [
  { value: "hair", label: "Hair" },
  { value: "massage", label: "Massage" },
  { value: "bueaty", label: "Bueaty" },

];
export const BranchOptions = [
  { value: "", label: "Choose a department" },
  { value: "hr", label: "Human Resources" },
  { value: "it", label: "IT / Technology" },
  { value: "finance", label: "Finance" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "operations", label: "Operations" },
  { value: "legal", label: "Legal" },
];


export const offersColumn = [
  { key: "name", label: "Name" },
  { key: "discountType", label: "Discount type" },
  { key: "discount", label: "Discount" },
  { key: "limitType", label: "Limit type" },
  { key: "quantity", label: "Quantity" },
  { key: "repeat", label: "Repeat" },
  { key: "code", label: "Code" },
  {
    key: "startDate",
    label: "Start date",
    render: (value) => {
      if (!value) return "N/A";
      try {
        return new Date(value).toLocaleDateString();
      } catch {
        return value;
      }
    },
  },
  {
    key: "endDate",
    label: "End date",
    render: (value) => {
      if (!value) return "N/A";
      try {
        return new Date(value).toLocaleDateString();
      } catch {
        return value;
      }
    },
  },
  { key: "category", label: "Category" },
  { key: "status", label: "Status" },
];

// Sample data that matches your table structure
export const offersData = [
  {
    name: "Summer Sale",
    discountType: "Percentage",
    discount: "20%",
    limitType: "Per User",
    quantity: 100,
    repeat: "Once",
    code: "SUMMER20",
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    category: "Seasonal",
    status: "Active"
  },
  {
    name: "New User Discount",
    discountType: "Fixed Amount",
    discount: "$50",
    limitType: "First Time",
    quantity: 500,
    repeat: "No Limit",
    code: "WELCOME50",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    category: "Welcome",
    status: "Active"
  },
  {
    name: "Flash Sale",
    discountType: "Percentage",
    discount: "30%",
    limitType: "Limited Time",
    quantity: 50,
    repeat: "Multiple",
    code: "FLASH30",
    startDate: "2025-08-20",
    endDate: "2025-08-25",
    category: "Flash",
    status: "Active"
  }
];


export const dummyProfessionals = [
  {
    id: 1,
    name: "Abdurrahman K.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    availability: "Available today",
    rating: 5,
    reviews: 110,
  },
  {
    id: 2,
    name: "Ayesha M.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    availability: "Available tomorrow",
    rating: 4,
    reviews: 85,
  },
  {
    id: 3,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    availability: "Available today",
    rating: 5,
    reviews: 120,
  },
  {
    id: 4,
    name: "Fatima S.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    availability: "Available next week",
    rating: 3,
    reviews: 40,
  },
  {
    id: 5,
    name: "Ali R.",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    availability: "Available today",
    rating: 4,
    reviews: 60,
  },
];
export const sampleData = {
  name: "Ceyhun Kokolumsuz",
  lastname: "Kuafor",
  appointmentNo: "Y23 ASD01",
  serviceCategory: "Kuafor",
  gender: "Mars",
  appointmentDate: "29.08.2025",
  appointmentTime: "09:00",
  creationDate: "26.08.2025",
  creationTime: "23:15",
  freeCancelationDate: "28.08.2025",
  freeCancelationTime: "09:00",
  cancelationFee: "300,00TL"
};


export const officesColumns = [
  { key: "name", label: "Name" },
  { key: "type", label: "Type" },
  { key: "country", label: "Address" },
  { key: "authorized", label: "Authorized" },
  {
    key: "contract",
    label: "Contract",
    render: (value) => {
      if (!value) return "N/A";

      // Check if value is PDF
      const isPdf = value.toLowerCase().endsWith(".pdf");

      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-700"
        >
          {isPdf ? "View PDF" : <img src={value} alt="Contract" className="h-10 w-10 object-cover rounded" />}
        </a>
      );
    },
  }, { key: "duration", label: "Duration" },
  { key: "contactPersonPhone", label: "Contact" },
  {
    key: "startDate",
    label: "Start date",
    render: (value) => {
      if (!value) return "N/A";
      try {
        return new Date(value).toLocaleDateString();
      } catch {
        return value;
      }
    },
  },
  {
    key: "endDate",
    label: "End date",
    render: (value) => {
      if (!value) return "N/A";
      try {
        return new Date(value).toLocaleDateString();
      } catch {
        return value;
      }
    },
  },
  { key: "employees", label: "Employee" },
  { key: "payment", label: "Payment" },
  {
    key: "paid",
    label: "Paid",
    render: (_, row) => {
      return row.status === "inactive" ? "Not Paid" : "Paid";
    },
  },
  { key: "price", label: "Price" },
  { key: "status", label: "Status" },
];

export const officesData = [
  {
    name: "Office Cleaning Service",
    type: "Service",
    address: "123 Business Ave, Downtown",
    authorized: "John Smith",
    contract: "CS-2025-001",
    duration: "12 months",
    contact: "+1-555-0123",
    startDate: "2025-01-15",
    endDate: "2026-01-15",
    employee: "Sarah Johnson",
    payment: "Monthly",
    paid: "Yes",
    price: "$2,500",
    status: "Active"
  },
  {
    name: "IT Support Contract",
    type: "Service",
    address: "456 Tech Street, Silicon Valley",
    authorized: "Mike Davis",
    contract: "IT-2025-002",
    duration: "24 months",
    contact: "+1-555-0456",
    startDate: "2025-02-01",
    endDate: "2027-02-01",
    employee: "Alex Chen",
    payment: "Quarterly",
    paid: "Pending",
    price: "$15,000",
    status: "Active"
  },
  {
    name: "Security Services",
    type: "Service",
    address: "789 Guard Lane, Metro City",
    authorized: "Lisa Wilson",
    contract: "SEC-2025-003",
    duration: "36 months",
    contact: "+1-555-0789",
    startDate: "2025-03-01",
    endDate: "2028-03-01",
    employee: "Robert Brown",
    payment: "Monthly",
    paid: "Yes",
    price: "$8,500",
    status: "Active"
  },
  {
    name: "Equipment Lease",
    type: "Lease",
    address: "321 Industrial Blvd, Factory District",
    authorized: "Tom Anderson",
    contract: "EQ-2024-004",
    duration: "60 months",
    contact: "+1-555-0321",
    startDate: "2024-12-01",
    endDate: "2029-12-01",
    employee: "Emma Garcia",
    payment: "Monthly",
    paid: "Yes",
    price: "$25,000",
    status: "Active"
  },
  {
    name: "Maintenance Agreement",
    type: "Service",
    address: "654 Repair Road, Workshop Area",
    authorized: "Kevin Lee",
    contract: "MA-2025-005",
    duration: "18 months",
    contact: "+1-555-0654",
    startDate: "2025-01-01",
    endDate: "2026-07-01",
    employee: "Daniel Martinez",
    payment: "Bi-annual",
    paid: "No",
    price: "$12,500",
    status: "Expired"
  }
];

export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "57px",
    borderRadius: "11px",
    border: "none",
    boxShadow: state.isFocused ? " " : "none",
    backgroundColor: theme === "dark" ? "#202020" : "#EEEEEE",
    fontSize: "16px",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: theme === "dark" ? "#202020" : "white",
    color: theme === "dark" ? "white" : "black",
    zIndex: 100,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#f97316"
      : state.isFocused
        ? theme === "dark" ? "#2A2A2A" : "#f3f4f6"
        : "transparent",
    color: state.isSelected ? "white" : theme === "dark" ? "white" : "black",
    cursor: "pointer",
    fontSize: "15px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: theme === "dark" ? "white" : "black",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: theme === "dark" ? "#9ca3af" : "#6b7280",
  }),
};
 
export const employeeColumns = [
  { key: "name", label: "Name" },
  { key: "lastname", label: "Lastname" },
  { key: "gender", label: "Gender" },
  { key: "country", label: "Country" },
  { key: "address", label: "Address" },
  { key: "contact", label: "Contact" },
  { key: "department", label: "Department" },
  { key: "position", label: "Position" },
  { key: "office", label: "Office" },
  { key: "wage", label: "Wage" },
  { key: "startDate", label: "Start date" },
  { key: "contract", label: "Contract" },
  { key: "hiredBy", label: "Hired by" },
  { key: "status", label: "Status" }
];


export const usersColumns = [
  { key: "name", label: "Name" },
  { key: "lastname", label: "Lastname" },
  { key: "username", label: "Username" },
  { key: "gender", label: "Gender" },
  { key: "country", label: "Country" },
  { key: "city", label: "City" },
  { key: "district", label: "District" },
  { key: "town", label: "Town" },
  { key: "phone", label: "Phone" },
  { key: "mail", label: "Mail" },
  { key: "signUpDate", label: "Sign up date" },
  { key: "category", label: "Category" },
  { key: "status", label: "Status" }
];
export const partnerColumns = [
  { key: "partner", label: "Partner" },
  { key: "branch", label: "Branch" },
  { key: "username", label: "Username" },
  { key: "country", label: "Country" },
  { key: "contact", label: "Contact" },
  { key: "mail", label: "Mail" },
  { key: "signUpDate", label: "Sign up date" },
  { key: "confirmation", label: "Confirmation" },
  { key: "offers", label: "Offers" },
  { key: "authorized", label: "Authorized" },
  { key: "ratings", label: "Ratings" },
  { key: "status", label: "Status" }
];
