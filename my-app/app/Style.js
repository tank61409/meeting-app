import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    width: '100%', // 设置容器宽度，文本会依据此宽度自动换行
    backgroundColor: '#FFFFFF',
  },  
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    marginVertical: 10,
  },
   back: {
    flex: 1,
    justifyContent: "center", 
    alignItems: 'center', 
    backgroundColor: "#0D0D0D", 
    width: '100%', // 设置容器宽度，文本会依据此宽度自动换行
    borderRadius: 12
  },  
  icon:{
    justifyContent: "center", 
    alignItems: 'center', 
    color:"#4F8C6F"
  },
  button: {
    position: 'absolute',
    width: 158 ,
    height: 158,
    flexDirection: 'column',
    paddingVertical: 12, // 上下内边距
    paddingHorizontal: 28, // 左右内边距
    backgroundColor: '#4F8C6F', // 对应 bg-neutral-700
    borderRadius: 12, // 对应 rounded-xl
    margin: 20, 
  }, 
  buttontext: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 10,
  },
  list:{
    margin:30,
    borderRadius:12,
    backgroundColor:'#E5DCFA'
  }
});

export default styles;