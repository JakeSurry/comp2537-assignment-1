import { motion } from "framer-motion";

const PopUp = ({title, body, label, onAccept}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-800 rounded-2xl p-8 max-w-sm w-full mx-4 text-center"
      >
        <h2 className="text-2xl font-bold text-text mb-2">
        {title}
        </h2>
        <p className="text-gray-400 mb-6">
        {body}
        </p>
        <button
          onClick={() => onAccept()}
          className="w-full text-xl font-bold p-4 rounded-xl text-primary border-2 border-primary hover:cursor-pointer hover:bg-primary hover:text-surface transition duration-200"
        >
        {label}
        </button>
      </motion.div>
    </motion.div>
  );
};
export default PopUp;
