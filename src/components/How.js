// necessary imports
import React from 'react';
import 'antd/dist/antd.min.css';
import { Space, Typography, Col, Row } from 'antd';

import Sample from './Sample';

const { Title, Paragraph, Link, Text } = Typography;

const How = () => {
  let github = <Link href='https://github.com/alessgomez/DIGIMAPStyleTransfer' target="_blank">here</Link>

  return(

    <Space direction="vertical"
      style ={{
        justifyContent: "center"
      }}>
      
      <Title
      style={{
        color: "#e0ae9f"
      }} 
      level={1}> 
      About the Project 
      </Title>

      <Paragraph
      style ={{
        textAlign: "justify",
        color: 'black'
      }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Paragraph>

      <Title
      style={{
        color: "#e0ae9f"
      }} 
      level={1}> 
      Acknowledgement 
      </Title>

      <Paragraph style ={{
        textAlign: "justify",
        color: 'black'
      }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Paragraph>
    </Space>
  )
}

export default How