import Image from "next/dist/client/image";

const MemorieCard = ({ memorie }) => {
  const nbLikes = Math.floor(Math.random() * 100);
  return (
    <div className="relative max-w-sm flex flex-col rounded-md overflow-hidden shadow-lg group">
      <div className="-mb-3 group-hover:scale-105 transition duration-500 -z-10">
        <Image
          src={!memorie.image ? "/images/noimage.jpg" : memorie.image}
          alt={memorie.title}
          loading="lazy"
          height={"250"}
          width={"400"}
          objectFit="cover"
        />
      </div>

      <div className="absolute top-2 left-2">
        <span className="text-gray-700 font-medium text-lg">
          {memorie.name}
        </span>
      </div>

      <div className="flex flex-col justify-between gap-4 px-3 py-4 bg-white h-full">
        <div className="flex flex-col">
          <span className="text-gray-400 font-normal text-xs">
            #{memorie.hashtag}
          </span>
          <span className="font-semibold text-lg">{memorie.title}</span>
        </div>
        <p className="font-normal text-base">{memorie.desc}</p>
        <div>{nbLikes}</div>
      </div>
    </div>
    // <Container>
    //   <Part1>
    //     <Image
    //       src={!memorie.image ? "/images/noimage.jpg" : memorie.image}
    //       layout="fill"
    //       alt={memorie.title}
    //       objectFit="cover"
    //       loading="lazy"
    //     />
    //     <Text>{memorie.name}</Text>
    //   </Part1>
    //   <Part2>
    //     <Title>
    //       <span>#{memorie.hashtag}</span>
    //       <h1>{memorie.title}</h1>
    //     </Title>
    //     <p>{memorie.desc}</p>
    //     <p>{nbLikes} Likes</p>
    //   </Part2>
    // </Container>
  );
};

export default MemorieCard;
