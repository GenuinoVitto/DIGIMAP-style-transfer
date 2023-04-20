// import antd component library
import { Col, Row, Layout, Button, Space, PageHeader, Progress, BackTop, message, Modal } from 'antd';
import { GithubOutlined, DownloadOutlined, WarningOutlined } from '@ant-design/icons';
import { useRef, useState, useEffect } from 'react';
import * as mi from '@magenta/image'
import * as tf from '@tensorflow/tfjs'
import 'antd/dist/antd.min.css';
import './css/App.css'

// import components
import UploadButton from './components/UploadButton';
import How from './components/How';

// constants
const { Header, Content, Footer } = Layout;

const info = msg => message.info(msg)
const success = msg => message.success(msg)
const warning = msg => message.warning(msg)

const getRatio = (image) => {
  const maxSize = 256;
  const width = image.shape[0];
  const height = image.shape[1];

  if(width > height) {
    let percent = height / width;
    return [maxSize, Math.floor(maxSize * percent)];
  }
    
  else {
    let percent = width / height;
    return [Math.floor(maxSize * percent), maxSize];
  }
}

const preprocess = (imgData) => {
  return tf.tidy(()=>{
    // convert the image data to a tensor
    let tensor = tf.browser.fromPixels(imgData, 3);
    let ratio = getRatio(tensor)
    const resized = tf.image.resizeBilinear(tensor, ratio).toFloat()
  
    // Normalize the image 
    const offset = tf.scalar(255.0);
    const normalized = resized.div(offset);
  
    //We add a dimension to get a batch shape 
    const batched = normalized.expandDims(0);
    return batched;
   })
}

// App Component
const App = () => {
  let isHandheld = false;
  const [visible, setVisible] = useState(true)
  const [visProg, setVisProg] = useState('none')
  const [visBtn, setVisBtn] = useState('none')
  const [fastModel, setFastModel] = useState(new mi.ArbitraryStyleTransferNetwork())
  const [model, setModel] = useState({});
  const [progress, setProgress]= useState(0.00);
  const [gpu, setGpu] = useState(true);
  const [fast, setFast] = useState(true);
  const canvasRef = useRef()
  const contentRef = useRef()
  const styleRef = useRef()
  
  useEffect(() => {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) 
      isHandheld = true;
      fastModel.initialize().then(()=>{
      setFast(false)
      info('Fast Style now usable.')
    })

    if(!isHandheld) {
      warning('Application is downloading (88mb)!')
      setVisBtn('inline-block')
      setVisProg('inline-block')
      fetchModel()
    }
  }, []);

  const fetchModel = async () => {
    let fetchedModel = await tf.loadGraphModel('model/model.json', 
    {onProgress: (progress)=>{
      const progressed = (progress*100).toFixed(2)
      
      console.log(`download progress: ${progressed}%`)
    
      if(progressed >= 100) {
        setGpu(false)
        setVisProg('none')
        console.log('finished')
        info('GPU Style now usable.')
      }
      
      setProgress(progressed)
    }})
    
    setModel(fetchedModel)
  }

  const handleStyle = () => {
    message.loading('please wait...', 2, () => {
      console.log('style transferring...')
      const content = contentRef.current;
      const style = styleRef.current;
      
      const contentTensor = preprocess(content);
      const styleTensor = preprocess(style);

      const result = model.execute([styleTensor, contentTensor]);
      const canvas = canvasRef.current;
    
      tf.browser.toPixels(tf.squeeze(result), canvas);
      success('Style transferred!')
    })
  }

  const handleFastStyle = () => {
    /*
    message.loading('please wait...', 2, () => {
      console.log('style transferring...')
      const content = contentRef.current;
      const style = styleRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d')

      fastModel.stylize(content, style).then((imageData) => {
        // generate a second canvas
        var renderer = document.createElement('canvas');
        renderer.width = imageData.width;
        renderer.height = imageData.height;

        // render our ImageData on this canvas
        renderer.getContext('2d').putImageData(imageData, 0, 0);

        ctx.drawImage(renderer, 0,0, canvas.width, canvas.height)
        success('Style transferred!')
      });
    })*/
    fetch("/hello").then(
      res => res.json()
    ).then(
        data => {
          document.getElementById('main-title').innerHTML = data.stringout
        }
    )
  }

  const handleDownload = () => {
    const canvas = canvasRef.current;
 
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "stylized-img.png";
    link.href = url;
    link.click();
  }

  return (
    <>
    <BackTop/>
    <Layout>
        <div id='parallax-ina' style={{
            backgroundColor: '#f5f4f0',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            zIndex: 1
          }}>
          <Content>
            <div id='header-content'>
              <Layout
                id='main-layout-background'
                style={{
                  height: '100%',
                  padding: '0px 0',
                  background: 'none'
                }}
              >
                <Content
                  style={{
                    padding: '0 0px',
                    minHeight: 0,
                  }}
                >
          
                <Row 
                style={{
                  backgroundColor:'#453f3a',
                }}
                justify='center'>
                  <Col align='middle'>
                    <p id='main-title'>
                      Image Style Transfer
                    </p>
                  </Col>
                </Row>
          
                <Row 
                style={{
                  margin: '30px 0'
                }}
                  justify='space-evenly'>
                  <Col style={{
                    margin: '10px 0 0 0'
                  }}
                  xs='24'
                  sm='12'
                  md='8'
                  align='middle'>
                    <p className='title-image'>Content Image</p>
                    <UploadButton type={'content'} innerRef={contentRef}/>
                  </Col>
                  <Col style={{
                    margin: '10px 0 0 0'
                  }}
                  xs='24'
                  sm='12'
                  md='8'
                  align='middle'>
                    <p className='title-image'>Style</p>
                    <UploadButton type={'style'} innerRef={styleRef}/>
                  </Col>
                  <Col style={{
                    margin: '10px 0 0 0'
                  }}
                    xs='24'
                    sm='12'
                    md='8' align='middle'>
                      <p className='title-image'>Output</p>
                      <UploadButton type={'stylized'} innerRef={canvasRef}/>
                    <div>
                      <Button type='primary' id='fast-button'  onClick={handleFastStyle}
                      style={{
                        width: 120,
                        margin: '13px 13px 0 3px',
                        backgroundColor: "#491718", borderColor: "#4a161e" 
                      }} disabled={fast}
                      >Fast Style</Button>
                      <Button type='primary' onClick={handleStyle}
                      style={{
                        width: 120,
                        margin: '13px 13px 0px 0',
                        backgroundColor: "#491718", borderColor: "#4a161e", 
                        display: `${visBtn}`
                      }} disabled={gpu} id='gpu-button'
                      >GPU Style</Button>
                      <Button style={{
                        width: '31px',
                        height: '31px',
                        color: '#4a161e',
                        borderColor: "#4a161e"
                      }} ghost icon={<DownloadOutlined />} size='medium' onClick={handleDownload}/>
                    </div>
                  </Col>
                </Row>
                </Content>
                <Progress style={{
                  display: `${visProg}`
                }}
                    strokeColor={{
                      from: '#773806',
                      to: '#626c16',
                    }}
                    percent={progress}
                    status="active"
                />
              </Layout>
            </div>
            </Content>
        </div>
      <Layout
        className = 'site-layout-background'
        id= 'pad-layout'
      >
        <Content id='pad-content'
          style={{
          padding: '0 10px',}}
        >
          <How/>
        </Content>
      </Layout>

    <Footer
      style={{
        textAlign: 'center',
        color: '#f5f4f0',
        backgroundColor: '#8a807b'
      }}
    >
    
      
      <Space direction='vertical'>
        Image Style Transfer | DIGIMAP 2023 | Fong, Hannah Regine C. | Genuino, Jose Mari Victorio G. | Gomez, Alessandra Pauleen I. | Tighe, Kaitlyn Patricia
        <Button type="text" href='https://github.com/alessgomez/DIGIMAPStyleTransfer' target="_blank">
            <GithubOutlined className="teamSocialIcon" />
        </Button>
      </Space>
    </Footer>
  </Layout>
    </>
  );
};

export default App;