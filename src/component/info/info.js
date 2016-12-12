// 此组件是容器组件
import config from 'config/config.json';
import Inbox from 'component/inbox/inbox.js';
import UserEntry from 'component/userEntry/userEntry.js';

let infoData = [{
    id: '1',
    title: '非豆科绿肥',
    user: 'flowke',
    time: 'fdlkfslk',
    read: 30,
    comment: 89,
    like: 77
}];
for(let i=0; i<40; i++){
    infoData.push(infoData[0]);
}
import style from './info.scss';
export default class Info extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            inboxData: infoData,
            entryData: {
                isLogin: true
            }
        };

        this.changeUserEntry = this.changeUserEntry.bind(this);
    }
    // 登陆还是注册
    changeUserEntry(token){
        let {entryData} = this.state;
        entryData.isLogin = token;
        this.setState({entryData});
    }


    render(){
        let { whichPanel, changeLoginState, changeInfoPanel, handleUserLogin } = this.props;
        let {inboxData, entryData} = this.state;
        let component = null;
        let tit = '';
        switch(whichPanel){
            case 'home':
                break;
            case 'inbox':
                component = inboxData.map( (elt,indx)=>( <Inbox key={indx} data={elt}/>) );
                tit = 'Inbox';
                break;
            case 'userEntry':
                component = (
                    <UserEntry
                        isLogin={entryData.isLogin}
                        changePanel={this.changeUserEntry}
                        changeLoginState={changeLoginState}
                        changeInfoPanel={changeInfoPanel}
                        handleUserLogin={handleUserLogin}
                    />);
                tit = entryData.isLogin ? '登陆': '注册';
        };
        return (
            <section className={`col-lg-4 ${style.section}`}>
                <header className={`${style.header}`}><h2 className={`page-header`}>{tit}</h2></header>
                <div className={`${style.wrap}`}>
                    {component}
                </div>
            </section>
        );
    }


}
