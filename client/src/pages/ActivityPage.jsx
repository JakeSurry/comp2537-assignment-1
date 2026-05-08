import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useActivityStore } from "../store/activityStore";
import Select from "../components/Select";

const ActivityPage = () => {
  const { events, fetchEvents, deleteEvent, isLoading } = useActivityStore();

  const [typeFilter, setTypeFilter] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const filteredEvents = events
    .filter((event) => (typeFilter ? event.action === typeFilter : true))
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sort === "newest" ? dateB - dateA : dateA - dateB;
    });

  if (isLoading && events.length === 0) return null;

  return (
    <div className="w-full mx-auto px-4">
      <div className="flex gap-3 mb-6">
        <Select
          value={typeFilter}
          onChange={setTypeFilter}
          options={[
            { value: "login", label: "Login" },
            { value: "logout", label: "Logout" },
            { value: "register", label: "Register" },
            { value: "unregister", label: "Unregister" },
            { value: "add_favorite", label: "Add Favorite" },
            { value: "remove_favorite", label: "Remove Favorite" },
          ]}
          placeholder="All Events"
        />
        <Select
          value={sort}
          onChange={setSort}
          options={[
            { value: "newest", label: "Most Recent" },
            { value: "oldest", label: "Least Recent" },
          ]}
        />
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text text-lg">No events found</p>
          <p className="text-muted text-sm mt-1">
            {typeFilter
              ? "Try a different filter"
              : "Your activity will show up here"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="flex items-center justify-between bg-gray-800 bg-opacity-50 backdrop-blur-2xl rounded-xl px-5 py-4 group"
            >
              <div>
                <p className="text-text">{event.description}</p>
                <p className="text-muted text-sm mt-1">
                  {new Date(event.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => deleteEvent(event._id)}
                className="text-muted hover:text-primary transition duration-200 opacity-0 group-hover:opacity-100 hover:cursor-pointer"
              >
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityPage;
