import Header from "../Header";
import Navbar from "../Navbar";
const VendorCard = ({ name, description, email, logo }) => {
  return (
    <div className="bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden w-full max-w-sm hover:shadow-xl transition-shadow duration-300">
      <div className="p-6 flex flex-col items-center">
        {logo && (
          <img
            src={logo}
            alt={`${name} logo`}
            className="h-20 w-20 object-cover rounded-full border border-gray-200 mb-4"
          />
        )}
        <h2 className="text-lg font-semibold mb-1 text-center">{name}</h2>
        <p className="text-sm text-gray-600 text-center mb-3">{description}</p>
        <p className="text-xs text-gray-500 text-center mb-5">{email}</p>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-md font-medium transition">
          View Details
        </button>
      </div>
    </div>
  );
};


const vendorList = [
  {
    name: "Vendor A",
    description: "Providing high-quality electronics.",
    email: "contact@vendora.com",
    logo: "https://via.placeholder.com/80"
  },
  {
    name: "Vendor B",
    description: "Specialist in organic foods.",
    email: "info@vendorb.com",
    logo: "https://via.placeholder.com/80"
  },
  // Add more vendors as needed
];
function Vendors() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header title={['Reminders', 'User']} />
      <div className="flex">
        <Navbar />
        <main className="flex-grow p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Vendors</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {vendorList.map((vendor, index) => (
              <VendorCard key={index} {...vendor} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Vendors;
