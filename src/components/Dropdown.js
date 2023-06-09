import React from 'react';
import 'antd/dist/antd.min.css';
import { Select } from 'antd';
const { Option, OptGroup } = Select;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const Dropdown = () => (
  <>
    <Select
      defaultValue="custom"
      style={{
        width: 120,
        margin: '20px 0 0 0',
      }}
      onChange={handleChange}
    >
      <OptGroup label="Own Image">
        <Option value="custom">Custom</Option>
      </OptGroup>
      <OptGroup label="Presets">
        <Option value="arturo">Arturo Luz</Option>
        <Option value="benedicto">Benedicto Cabrera</Option>
      </OptGroup>
      
    </Select>
  </>
);

export default Dropdown;