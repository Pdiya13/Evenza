import React, { useState } from 'react';

const mockGoogleContacts = [
  { id: 1, name: "Priya Singh", email: "priya@gmail.com" },
  { id: 2, name: "Vikas Mehta", email: "vikas.m@gmail.com" },
  { id: 3, name: "Kavita Rao", email: "kavita.rao@gmail.com" },
  { id: 4, name: "Ankit Sinha", email: "ankit.sinha@gmail.com" },
];

export default function GuestManagement() {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contacts, setContacts] = useState(mockGoogleContacts); // Replace this with Google API data later

  const toggleContact = (id) => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleGoogleLogin = () => {
    // Replace this with actual Google Auth logic
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#C3D0E5] p-6">
      <div className="max-w-3xl mx-auto bg-[#161B22] rounded-xl shadow-lg p-6">
        {!isLoggedIn ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Welcome to Guest Management</h2>
            <p className="text-[#8B949E] mb-6">Sign in with Google to access your contact list</p>
            <button
              onClick={handleGoogleLogin}
              className="bg-[#238636] hover:bg-[#2ea043] text-white px-6 py-2 rounded-md transition"
            >
              Login with Google
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <img
                  src="https://via.placeholder.com/50"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full border border-[#30363d]"
                />
                <div>
                  <h2 className="text-2xl font-bold">Welcome, Diya!</h2>
                  <p className="text-sm text-[#8B949E]">Manage your guest invitations</p>
                </div>
              </div>
              <div className="bg-[#238636] text-white px-3 py-1 rounded-md text-sm font-medium">
                Gemini AI Mailer Enabled
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4">Your Google Contacts</h3>
            <ul className="space-y-3">
              {contacts.map(contact => (
                <li
                  key={contact.id}
                  className="flex justify-between items-center border border-[#30363d] bg-[#21262D] p-3 rounded hover:bg-[#2A2F37] transition"
                >
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-[#8B949E]">{contact.email}</p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-[#238636]"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => toggleContact(contact.id)}
                  />
                </li>
              ))}
            </ul>

            <button
              className="mt-6 w-full bg-[#238636] hover:bg-[#2ea043] text-white py-2 px-4 rounded-md transition"
            >
              Send Invitations via Gemini
            </button>
          </>
        )}
      </div>
    </div>
  );
}
