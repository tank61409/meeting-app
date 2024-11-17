import { Feather } from "@expo/vector-icons";


export const icon = {
    Home: (props:any) => <Feather name='home' size={24} color={'#222'} {...props}/>,
    Download: (props:any) => <Feather name='target' size={24} color={'#222'} {...props}/>,
    Team: (props:any) => <Feather name='user' size={24} color={'#222'} {...props}/>,
    Setting: (props:any) => <Feather name='settings' size={24} color={'#222'} {...props}/>,
  }