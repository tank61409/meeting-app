import React, { useEffect, useState } from 'react';
import { Text, View ,ScrollView} from 'react-native';
import axios from 'axios';


import styles from './Style';
const Download = () => {
  const [data, setData] = useState(String);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://192.168.1.191:5000/download'; // 替换为你的下载链接
      try {
        const response = await axios.get(url, { responseType: 'text' });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  
  let str = data.replace(/.{0,7}~+/g, '')
  str = str.replace(":","：")
  const speakerColors: { [key: string]: string } = {};

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() *10)];
    }
    return color;
  };

// 使用正则表达式匹配发言者
const renderDialogue = () => {
  return str.trim().split('\n').map((line, index) => {
    // 匹配格式：0:00:01 SPEAKER_01 My name is Jenny.
    const match = line.match(/(\d+:\d+:\d+)\s+(SPEAKER_\d+)\s+(.*)/);
    if (match) {
      const time = match[1];
      const speaker = match[2];
      const text = match[3];

      // 如果发言者没有分配颜色，则分配随机颜色
      if (!speakerColors[speaker]) {
        speakerColors[speaker] = getRandomColor();
      }

      return (
        <Text key={index} style={styles.text}>
          {` ${time}  `} 
          <Text style={[styles.text, { color: speakerColors[speaker] }]}>
            {speaker}: 
          </Text>
          {` ${text}`}
        </Text>
      );
    }
    return null; // 处理不匹配的行
  });
};


  return (
    <ScrollView >
      <View style={styles.container}>
        {renderDialogue()}
      </View>
    </ScrollView>
  );
};

export default Download;