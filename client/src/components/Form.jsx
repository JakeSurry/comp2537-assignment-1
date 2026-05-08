import { Loader } from "lucide-react";

const Form = ({ children, error, isLoading, onSubmit, submitText }) => {
  return (
    <form className="flex flex-col gap-y-3" onSubmit={onSubmit}>
      {children}
      {error && (
        <p className="w-full text-center text-red-500 font-semibold mt-2">
          {error}
        </p>
      )}
      <button
        className="w-full text-xl font-bold mt-4 p-4 rounded-xl text-primary border-2 border-primary hover:cursor-pointer hover:bg-primary hover:text-surface hover:ring-2 hover:ring-primary transition duration-200"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader className="animate-spin mx-auto" size="24" />
        ) : (
          `${submitText}`
        )}
      </button>
    </form>
  );
};
export default Form;
