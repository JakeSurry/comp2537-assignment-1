import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Pencil, Check, X } from "lucide-react";
import { useAdminStore } from "../store/adminStore";
import { useAuthStore } from "../store/authStore";

const AdminPage = () => {
  const { user } = useAuthStore();
  const { users, loading, fetchUsers, updateUser, deleteUser } =
    useAdminStore();

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", role: "" });

  useEffect(() => {
    
    fetchUsers();
  }, [fetchUsers]);

  const startEdit = (u) => {
    setEditingId(u._id);
    setEditForm({ username: u.username, role: u.role });
  };

  const cancelEdit = () => setEditingId(null);

  const handleSave = async (id) => {
    const result = await updateUser(id, editForm);
    if (result.success) setEditingId(null);
  };

  if (loading && users.length === 0) return null;
  // if (!user || user.role !== "admin") return null;

  return (
    <div className="w-full mx-auto px-4">
      {users.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text text-lg">No users found</p>
          <p className="text-muted text-sm mt-1">
            Users will appear here once they register
          </p>
        </div>
      ) : (
        <div className="overflow-y-auto no-scrollbar max-h-[calc(100vh-200px)]">
          <div className="flex flex-col gap-2">
            {users.map((u, index) => (
              <motion.div
                key={u._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-center justify-between bg-gray-800 bg-opacity-50 backdrop-blur-2xl rounded-xl px-5 py-4 group"
              >
                {editingId === u._id ? (
                  <div className="flex items-center gap-3 flex-1 mr-4">
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) =>
                        setEditForm({ ...editForm, username: e.target.value })
                      }
                      className="px-3 py-1 bg-surface bg-opacity-50 rounded-lg border-2 border-muted text-text focus:outline-none focus:border-primary transition duration-200"
                    />
                    <select
                      value={editForm.role}
                      onChange={(e) =>
                        setEditForm({ ...editForm, role: e.target.value })
                      }
                      className="px-3 py-1 bg-surface bg-opacity-50 rounded-lg border-2 border-muted text-text focus:outline-none focus:border-primary transition duration-200"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <p className="text-text">
                      {u.username}
                      {u.role === "admin" && (
                        <span className="text-primary text-sm ml-2">admin</span>
                      )}
                    </p>
                    <p className="text-muted text-sm mt-1">
                      Joined {new Date(u.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  {editingId === u._id ? (
                    <>
                      <button
                        onClick={() => handleSave(u._id)}
                        className="text-muted hover:text-primary transition duration-200 hover:cursor-pointer"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-muted hover:text-primary transition duration-200 hover:cursor-pointer"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(u)}
                        className="text-muted hover:text-primary transition duration-200 hover:cursor-pointer"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => deleteUser(u._id)}
                        disabled={u._id === user._id}
                        className="text-muted hover:text-primary transition duration-200 disabled:opacity-0 disabled:cursor-not-allowed hover:cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
