import MemorieCard from "./MemorieCard";

const MemoriesList = ({ memories, title }) => {
  return (
    <div>
      <h2 className="text-black font-medium text-xl mb-4 ml-6">{title}</h2>
      <div className="grid grid-flow-row-dense gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto mb-6 place-content-center">
        {memories?.map((memorie) => (
          <MemorieCard memorie={memorie} key={memorie._id} />
        ))}
      </div>
    </div>
  );
};

export default MemoriesList;
