import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../header";
import Footer from "../../footer";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not authorized. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3005/api/users/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.response?.data?.error || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">All Users</h1>

          {loading && (
            <div className="text-center text-gray-600">Loading users...</div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-6">
              {error}
            </div>
          )}

          {!loading && !error && users.length === 0 && (
            <div className="text-gray-600">No users found.</div>
          )}

          {!loading && !error && users.length > 0 && (
            <div className="overflow-x-auto border rounded-lg shadow bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Profile
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={user.profilePicture}
                          alt={`${user.firstname} ${user.lastname}`}
                          className="h-10 w-10 rounded-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg";
                          }}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.firstname} {user.lastname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                        {user.address}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
