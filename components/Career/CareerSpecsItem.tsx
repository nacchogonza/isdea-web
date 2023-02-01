interface CareerSpecsItemProps {
    image_src: string;
    title: string;
    content: string;
  }

export const CareerSpecsItem = ({image_src, title, content} : CareerSpecsItemProps) => {
  return (
    <div className="careerInfoBox flex py-1 px-2 lg:py-2 lg:px-4">
      <img src={image_src} />
      <div className="careerInfoBoxSeparator" />
      <div className="flex flex-col">
        <h3 className="uppercase font-bold text-white text-sm ">{title}</h3>
        <p className="font-light text-white text-sm">{content}</p>
      </div>
    </div>
  );
};
