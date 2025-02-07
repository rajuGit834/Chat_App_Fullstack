import { FileImageOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Upload, Tooltip } from "antd";

const props: UploadProps = {
  action: "//jsonplaceholder.typicode.com/posts/",
  listType: "picture",
};

const UploadImage: React.FC = () => (
  <Upload {...props}>
    <Tooltip title="Upload image">
      <Button>
        <FileImageOutlined />
      </Button>
    </Tooltip>
  </Upload>
);

export default UploadImage;
