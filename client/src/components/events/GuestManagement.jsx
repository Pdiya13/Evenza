import React, { useState, useEffect } from "react";

const GuestManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("google_token") || null);

  const [selectedContacts, setSelectedContacts] = useState([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => console.log("Google Identity script loaded");
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (token) fetchContacts(token);
  }, [token]);

  const handleLoginClick = () => {
    if (!window.google) return alert("Google API not loaded yet. Please wait.");

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: "415432642850-0nrkfkvssmr6ea175b87jnuk3at9bau3.apps.googleusercontent.com",
      scope: "https://www.googleapis.com/auth/contacts.readonly",
      callback: (tokenResponse) => {
        const accessToken = tokenResponse.access_token;
        setToken(accessToken);
        localStorage.setItem("google_token", accessToken);
        fetchContacts(accessToken);
      },
    });

    tokenClient.requestAccessToken();
  };

  const fetchContacts = async (accessToken) => {
    try {
      const res = await fetch(
        "https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await res.json();
      setContacts(data.connections || []);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      localStorage.removeItem("google_token");
      setToken(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("google_token");
    setToken(null);
    setContacts([]);
    setSelectedContacts([]);
    setMessage("");
  };

  const toggleContact = (phone) => {
    setSelectedContacts((prev) =>
      prev.includes(phone) ? prev.filter((p) => p !== phone) : [...prev, phone]
    );
  };

  const sendWhatsApp = async () => {
    if (selectedContacts.length === 0 || !message.trim()) {
      alert("Select contacts and write a message.");
      return;
    }

    setSending(true);

    try {
      
      await fetch("/api/event/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contacts: selectedContacts, message }),
      });

      selectedContacts.forEach((phone) => {
        const waLink = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
        window.open(waLink, "_blank");
      });

      alert("WhatsApp links opened successfully!");
      setSelectedContacts([]);
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Failed to send WhatsApp messages.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mt-12 p-6 rounded-xl shadow-xl border border-gray-700 bg-[#0D1117] font-poppins-custom">
      <h2 className="text-2xl font-extrabold text-white mb-4 tracking-wide">
        Google Contacts
      </h2>
      <p className="text-sm text-gray-400 mb-6 leading-relaxed">
        Connect with your Google account to fetch your contacts.
      </p>

      {!token ? (
        <button
          onClick={handleLoginClick}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
        >
          Login with Google
        </button>
      ) : (
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="mb-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            Logout
          </button>

          <h3 className="text-xl text-white font-bold mb-4">Your Contacts</h3>
          {contacts.length === 0 ? (
            <p className="text-gray-400">No contacts found.</p>
          ) : (
            <ul className="space-y-3 max-h-80 overflow-y-auto">
              {contacts.map((c, i) => {
                const phone = c.phoneNumbers?.[0]?.value;
                return (
                  <li
                    key={i}
                    className="flex items-center justify-between bg-[#161B22] border border-gray-700 p-3 rounded-lg hover:bg-[#1E222B] transition"
                  >
                    <div>
                      <span className="text-white font-medium">
                        {c.names?.[0]?.displayName || "No Name"}
                      </span>
                      <br />
                      <span className="text-gray-400 text-sm">
                        {c.emailAddresses?.[0]?.value || "No Email"}
                      </span>
                      <br />
                      <span className="text-gray-400 text-sm">
                        {phone || "No Phone"}
                      </span>
                    </div>
                    {phone && (
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(phone)}
                        onChange={() => toggleContact(phone)}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          <textarea
            className="w-full mt-4 p-3 rounded-lg bg-[#161B22] border border-gray-700 text-white"
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={sendWhatsApp}
            disabled={sending}
            className="mt-3 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send via WhatsApp"}
          </button>
        </div>
      )}
    </div>
  );
};

export default GuestManagement;
