import {AppRegistry, View} from 'react-native';
import App from './App';
import {
    StackNavigator,
    DrawerNavigator,
} from 'react-navigation';
import Icons from 'react-native-vector-icons/Ionicons';
import Const from './app/util/Const'

console.ignoredYellowBox = ['Remote debugger'];
const work = StackNavigator({
        Home: {screen: App}
    },
    {
        initialRouteName: 'Home',
        navigationOptions: {
            headerTitle: '行程小助手',
            // headerLeft: <Icons style={{alignItems: 'flex-end'}}
            //                    name='md-add' size={30} color={Const.BACKGROUND_COLOR}/>,
            headerTitleStyle: {
                alignSelf: 'center',
                color: '#fff',
                fontSize: 20,

            },
            headerStyle: {
                backgroundColor: Const.BACKGROUND_COLOR,
                height: Const.BAR_HEIGHT,
            },
        },
        mode: 'card'
    });


AppRegistry.registerComponent('work', () => work);
