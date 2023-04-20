// necessary imports
import React from 'react';
import 'antd/dist/antd.min.css';
import { Space, Typography, Col, Row } from 'antd';

import Sample from './Sample';

const { Title, Paragraph, Link, Text } = Typography;

const How = () => {
  let github = <Link href='https://github.com/GenuinoVitto/DIGIMAP-style-transfer' target="_blank">here</Link>

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
        color: 'black',
        fontSize: 14
      }}>
        The web application performs a Neural Style Transfer image processing where the content of the first image is rendered with the style of the second image. The web application features two ways in which the Neural Style Transfer technique is performed: (1) GPU style and (2) fast style. The fast style can be performed on any arbitrary painting with faster speed than the GPU style at the expense of lower quality.
      </Paragraph>

      <Title
      style={{
        color: "#e0ae9f"
      }} 
      level={1}> 
      How It Works 
      </Title>

      <Paragraph style ={{
        textAlign: "justify",
        color: 'black',
        fontSize: 14
      }}>
        Step 1: Upload a content image. <br/>
        Step 2: Upload a style image or choose from the available paintings by renowned Filipino artists.<br/>
        Step 3: Choose between fast or GPU style transfer and select the corresponding button.<br/>
        Step 4: View the output image and download it (optional).<br/>
      </Paragraph>

      <Title
      style={{
        color: "#e0ae9f"
      }} 
      level={1}> 
      Resources 
      </Title>

      <Paragraph style ={{
        textAlign: "justify",
        color: 'black',
        fontSize: 14
      }}>
        de Guzman, C. E, Roncal, R., & Rebong, L. H. (2022, August 21). Style Transfer Web App Using TensorFlow.js and React.js [GitHub Repository] <a href="https://github.com/cyril-deguzman/react-style-transfer">https://github.com/cyril-deguzman/react-style-transfer</a><br/>
        Gatys, L. A., Ecker, A. S., & Bethge, M. (2015). A neural algorithm of artistic style. Journal of Vision, 326. <a href="https://doi.org/10.1167/16.12.326">https://doi.org/10.1167/16.12.326</a><br/>
        Ghiasi, G., Lee, H., Kudlur, M., Dumoulin,V., & Shlens, J. (2017). Exploring the structure of a real-time, arbitrary neural artistic stylization network. Proceedings of the British Machine Vision Conference (BMVC), <a href="https://doi.org/10.48550/arXiv.1705.06830">https://doi.org/10.48550/arXiv.1705.06830</a><br/>
      </Paragraph>
    </Space>
  )
}

export default How
