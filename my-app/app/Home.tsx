import styles from './Style';

import { View, Button, Text} from 'react-native';
function HomeScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Button
          title='開始會議'
          color='orange'
          onPress={()=>navigation.navigate('Record')}
        />
      </View>
    );
  }
  
  export default HomeScreen;