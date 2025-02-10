import { FileImageFilled } from "@ant-design/icons";
import { Tooltip } from "antd";

interface ImageProps {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const UploadImage: React.FC<ImageProps> = ({ image, setImage }) => {
  const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!file.type.startsWith("image/")) {
        alert("Please Select valid image file");
        event.target.value = "";
        return;
      }
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {image && (
        <div className="flex absolute bottom-12 right-[10%]">
          <img
            src={image}
            alt="Selected"
            className="w-12 h-12 rounded-lg object-cover border border-gray-300"
          />
          <p className="cursor-pointer" onClick={() => setImage(null)}>
            X
          </p>
        </div>
      )}
      <label className="cursor-pointer">
        <input type="file" className="hidden" onChange={handleSelectImage} />
        <Tooltip title={"Upload Image"}>
          <FileImageFilled className="text-[20px] p-4 hover:bg-gray-300 rounded-full cursor-pointer" />
        </Tooltip>
      </label>
    </>
  );
};

export default UploadImage;
