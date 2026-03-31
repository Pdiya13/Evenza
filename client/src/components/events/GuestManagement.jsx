import React, { useState, useEffect } from "react";

const GuestManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("google_token"));
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Load Google SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Auto fetch contacts
  useEffect(() => {
    if (token) fetchContacts(token);
  }, [token]);

  // LOGIN (FIXED SCOPE)
  const handleLogin = () => {
    if (!window.google) {
      alert("Google SDK not loaded");
      return;
    }

    const client = window.google.accounts.oauth2.initTokenClient({
      client_id:
        "407584180231-qa8unfr0vgobg8cra96pjof4k37a65n6.apps.googleusercontent.com",

      // FIXED (ONE LINE)
      scope: "https://www.googleapis.com/auth/contacts.readonly",

      callback: (res) => {
        if (res.error) {
          console.error(res);
          alert("Login failed");
          return;
        }

        const accessToken = res.access_token;
        setToken(accessToken);
        localStorage.setItem("google_token", accessToken);

        fetchContacts(accessToken);
      },
    });

    client.requestAccessToken();
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("google_token");
    setToken(null);
    setContacts([]);
    setSelected([]);
  };

  // FETCH CONTACTS
  const fetchContacts = async (accessToken) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await res.json();
      setContacts(data.connections || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch contacts");
    }
    setLoading(false);
  };

  // SELECT / DESELECT
  const toggleSelect = (email) => {
    if (!email) return;

    setSelected((prev) =>
      prev.includes(email)
        ? prev.filter((e) => e !== email)
        : [...prev, email]
    );
  };

  // BULK INVITE (MAILTO)
  const sendBulkEmails = () => {
    if (!message.trim()) return alert("Enter message");
    if (selected.length === 0) return alert("Select guests");

    const subject = "Event Invitation";

    window.open(
      `mailto:${selected.join(",")}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(message)}`
    );
  };

  // SEARCH FILTER
  const filteredContacts = contacts.filter((c) => {
    const name = c.names?.[0]?.displayName || "";
    const email = c.emailAddresses?.[0]?.value || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Guest Management</h1>

      {!token ? (
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Login with Google
        </button>
      ) : (
        <>
          {/* TOP BAR */}
          <div className="flex justify-between mb-4 gap-4">
            <input
              placeholder="Search guest..."
              className="p-2 flex-1 bg-[#161B22] border border-gray-700 rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>

          {/* MESSAGE */}
          <textarea
            placeholder="Write invitation message..."
            className="w-full p-3 mb-4 bg-[#161B22] border border-gray-700 rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* SEND BUTTON */}
          <button
            onClick={sendBulkEmails}
            className="mb-4 bg-green-600 px-5 py-2 rounded"
          >
            Send Invite ({selected.length})
          </button>

          {/* CONTACT LIST */}
          {loading ? (
            <p>Loading contacts...</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredContacts.map((c, i) => {
                const name = c.names?.[0]?.displayName || "No Name";
                const email = c.emailAddresses?.[0]?.value;

                return (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-[#161B22] p-3 rounded"
                  >
                    <div>
                      <p>{name}</p>
                      <p className="text-gray-400 text-sm">
                        {email || "No Email"}
                      </p>
                    </div>

                    {email && (
                      <input
                        type="checkbox"
                        checked={selected.includes(email)}
                        onChange={() => toggleSelect(email)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GuestManagement;