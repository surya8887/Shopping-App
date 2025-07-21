import React from 'react';

const NewLetterBox = () => {
  const onsubmitHandler = (event) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="text-center py-5 px-4 bg-gray-50 rounded-lg shadow-sm">
      <p className="text-2xl sm:text-3xl font-semibold text-gray-800">
        Subscribe now & get <span className="text-orange-500">20% off</span> your first order
      </p>
      <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm sm:text-base">
        Stay in the loop with our latest collections, offers, and more.
      </p>

      <form
        onSubmit={onsubmitHandler}
        className="mt-6 max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
      >
        <input
          type="email"
          required
          className="w-full flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Enter your email address"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md transition duration-200"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewLetterBox;
