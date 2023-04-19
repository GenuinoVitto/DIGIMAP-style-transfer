import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { message, Upload, Select} from 'antd';
import { useState } from 'react';
import 'antd/dist/antd.min.css';
import '../css/UploadButton.css';

// import images
import arturo from '../img/Arturo_Luz.jpg'
import benedicto from '../img/Benedicto_Cabrera.jpg'
import fernando from '../img/Fernando_Armosolo.jpg'
import juvenal from '../img/Juvenal_Sanso.jpg'
import transparent from '../img/transparent.png'

const { Option, OptGroup } = Select;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJpgOrPng) 
    message.error('You can only upload JPG/PNG file types!');

  if (!isLt2M) 
    message.error('Image must be smaller than 2MB!');
  
  return isJpgOrPng && isLt2M;
};

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const UploadButton = (type) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleDropdown = (value) => {
    switch(value) {
      case 'arturo': setImageUrl(arturo); break;
      case 'benedicto': setImageUrl(benedicto); break;
      case 'fernando': setImageUrl(fernando); break;
      case 'juvenal': setImageUrl(juvenal); break;
      default: setImageUrl(transparent); break;
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
      <img
            id={type.type}
            ref={type.innerRef}
            src={transparent}
            alt="avatar"
            style={{
              height: '0%',
              width: '0%',
            }}
      />
      Upload
      </div>
    </div>
  );
  
  const contentUpload = (
    <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={dummyRequest}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            id={type.type}
            src={imageUrl}
            ref={type.innerRef}
            alt="avatar"
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
  )
  
  const styleUpload = (
    <div>
      {contentUpload}
      <Select
        defaultValue="custom"
        style={{
          width: 120,
          margin: '20px 0 0 0',
        }}
        onChange={handleDropdown}
      >
        <OptGroup label="Own Image">
          <Option value="custom">Custom</Option>
        </OptGroup>
        <OptGroup label="Presets">
          <Option value="arturo">Arturo Luz</Option>
          <Option value="benedicto">Benedicto Cabrera</Option>
          <Option value="fernando">Fernando Amorsolo</Option>
          <Option value="juvenal">Juvenal Sanso</Option>
        </OptGroup>
      </Select>
    </div>
  )

  const stylized = (
    <div>
      <canvas id='stylized-canvas' ref={type.innerRef}>
      </canvas>
    </div>
  )

  return (
    <> 
      {type.type == 'content' ? contentUpload: null}
      {type.type == 'style' ? styleUpload: null}
      {type.type == 'stylized' ? stylized: null}
    </>
  );
};

export default UploadButton;