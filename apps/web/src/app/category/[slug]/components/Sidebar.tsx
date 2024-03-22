const Sidebar = () => {
  return (
    <div className="shadow-md pt-3 pr-10 pb-10 pl-5 h-[900px] rounded-md w-[295px]">
      <h1 className="font-bold mb-7 text-lg">Product Categories</h1>
      <div className="flex gap-7 flex-col">
        <label>
          <input type="checkbox" name="option1" className="mr-2" />
          Vegetable
        </label>
        <label>
          <input type="checkbox" name="option2" className="mr-2" />
          Fruits
        </label>
        <label>
          <input type="checkbox" name="option3" className="mr-2" />
          Juice
        </label>
        <label>
          <input type="checkbox" name="option3" className="mr-2" />
          Meat
        </label>
        <label>
          <input type="checkbox" name="option3" className="mr-2" />
          Smoothie
        </label>
        <label>
          <input type="checkbox" name="option3" className="mr-2" />
          Bread
        </label>
        <label>
          <input type="checkbox" name="option3" className="mr-2" />
          Sea Foods
        </label>
        <label>
          <input type="checkbox" name="option3" className="mr-2" />
          Pet Foods
        </label>
        <label>
          <input type="checkbox" name="option3" className="mr-2" />
          Milk & Drinks
        </label>
        <label>
          <input type="checkbox" name="option3" className="mr-2" />
          Drinks
        </label>
        <label>
          <input type="checkbox" name="option3" className="mr-2" />
          Protein
        </label>

        <div className="mt-5">
          <input
            type="number"
            placeholder="Min Price"
            className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Max Price"
            className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <button className="bg-[#38b359] text-white px-3 py-2 rounded-md mt-5 hover:bg-[#40c764]">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
