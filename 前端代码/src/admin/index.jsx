import React, { useState, useEffect, useRef } from 'react';
import { Button, Table, Space, Modal, Image, message } from 'antd';
import { Redirect, useHistory } from 'react-router-dom'
import { reqAllFiles, reqDownLoadFile, reqDelFile, reqBeforeUploadFile } from '../api'
import $ from 'jquery'
import axios from 'axios';
const { Column } = Table;

function Admin() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const refForm = useRef(null);
  const refFile = useRef(null);
  useEffect(() => {
    async function fetchData() {
      const req = await reqAllFiles();
      setData(req);
    }
    fetchData()
  }, []);
  let storage = window.localStorage;
  const user = storage.user
  if (!user) {
    return <Redirect to='/login' />
  }

  const downFile = async (fileName) => {
    const url = await reqDownLoadFile(fileName);
    debugger
    axios({
      method: "get", //请求方式
      responseType: "blob", //告诉服务器我们需要的响应格式
      url: url, //地址
    }).then(res => {
      let url = window.URL.createObjectURL(new Blob([res.data])); //转换为可用URl地址
      let link = document.createElement("a"); //创建a标签
      link.style.display = "none"; //使之不可见
      link.href = url; //赋URL地址
      link.setAttribute("download", fileName); //设置下载属性、以及文件名
      document.body.appendChild(link); //将a标签插至页面中
      link.click(); //强制触发a标签事件
    }).catch(res => {
      message.error("下载出错了，请重试")
    });
  };

  const isAssetTypeAnImage = (ext) => {
    return [
      'png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].
      indexOf(ext.toLowerCase()) !== -1;
  }

  const showModal = async (filename) => {
    const index = filename.lastIndexOf(".");
    const ext = filename.substr(index + 1);
    if (isAssetTypeAnImage(ext)) {
      const url = await reqDownLoadFile(filename)
      setPreviewUrl(url);
      setIsModalVisible(true);
    } else {
      message.error("文件不支持预览，仅支持图片预览")
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPreviewUrl('');
  };

  const upload = async (e) => {
    e.preventDefault();
    const res = await reqBeforeUploadFile();
    const formdata = new FormData(refForm.current);
    formdata.set("key", refFile.current.files[0].name)
    formdata.set('policy', res['policy'])
    formdata.set('AccessKeyId', res['ak'])
    formdata.set('signature', res['signature'])
    formdata.forEach((value, key) => {
      console.log(key, value);
    })
    $.ajax({
      method: 'POST',
      url: 'http://lxy-bucket-input.obs.cn-north-1.myhuaweicloud.com/',
      data: formdata,
      // 不修改 Content-Type 属性，使用 FormData 默认的 Content-Type 值
      contentType: false,
      // 不对 FormData 中的数据进行 url 编码，而是将 FormData 数据原样发送到服务器
      processData: false,
      success: async (res) => {
        message.success("上传成功")
        setData([...await reqAllFiles()])
      },
      error: (res) => {
        message.success("上传失败")
      },
    })

  }
  return (
    <div>
      <header>
        <h2 style={{ display: "inline-block", fontSize: "16px" }}>lxy的云盘</h2>
        <Button onClick={() => {
          const storage = window.localStorage;
          storage.clear()
          history.push('/login')
        }} type="primary" style={{ float: "right" }}>登出</Button>
        <form id="a" ref={refForm} action="http://lxy-bucket-input.obs.cn-north-1.myhuaweicloud.com" method="post"
          encType="multipart/form-data" >
          <input type="hidden" name="key" value={"filename"} />
          <input type="hidden" name="x-obs-acl" value="public-read" />
          <input type="hidden" name="content-type" value="text/plain" />
          <input type="hidden" name="policy" value={"policy"} />
          <input type="hidden" name="AccessKeyId" value={"AccessKeyId"} />
          <input type="hidden" name="signature" value={"signature"} />
          <input ref={refFile} name="file" type="file" />
          <Button onClick={(e) => upload(e)}>上传文件</Button>
        </form>
      </header>
      <Table dataSource={data}>
        <Column title="文件名" dataIndex="key" key="key"
          render={tags => (
            <>
              <a style={{ "color": "blue" }} onClick={() => showModal(tags)}>
                {tags}
              </a>
            </>
          )}
        />
        <Column title="大小" dataIndex="size" key="size" />
        <Column title="创建时间" dataIndex="time" key="time" />
        <Column
          title="行为"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <a download onClick={() => {
                downFile(text.key)
              }}>下载文件</a>
              <a onClick={async () => {
                const res = await reqDelFile(text.key)
                if (res == "") {
                  setData([...await reqAllFiles()])
                  message.success("删除成功")
                }
              }}>删除文件</a>
            </Space>
          )}
        />
      </Table>
      <Modal title="点击图片放大预览" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[]} >
        <Image
          width={200}
          src={previewUrl}
        />

      </Modal>
    </div>
  );
}

export default Admin;
