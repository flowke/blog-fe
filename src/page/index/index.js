
require('bootstrap');
require('bower_components/bootstrap/dist/css/bootstrap.min.css');
require('style/main.scss');
import config from 'config/config.json'
import style from './index.scss';

import Nav from 'component/nav/nav.js';
import Info from 'component/info/info.js';

let navProps = {
    brandUrl: './img/curly-brackets.png'
}

class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            whichPanel: 'userEntry',
            hasLogin: false
        }

        this.changeInfoPanel = this.changeInfoPanel.bind(this);
        this.changeLoginState = this.changeLoginState.bind(this);
        this.handleUserLogin = this.handleUserLogin.bind(this);

    }
    // 修改显示哪个 infopanel
    changeInfoPanel(token){
        this.setState({whichPanel:token});
    }

    changeLoginState(token){
        this.setState({hasLogin:token});
    }

    handleUserLogin(isLogin, data, cb){
        let {username, passw, cfpassw} = data;
        if(isLogin){
            $.post({
                url: `${config.url}/home/user/login`,
                context: this,
                data: {username, passw},
                dataType: 'json'
            })
            .done( (data)=>{
                let {code, msg} = data;
                console.log(data);
                if(code===0){
                    this.changeInfoPanel('home');
                    this.setState({hasLogin:true});
                }
                cb(data);
            } )
            .fail( (err)=>{
                console.log(err)
            });
        }else{

            $.post({
                url: `${config.url}/home/user/signin`,
                context: this,
                data: {username, passw, cfpassw},
                dataType: 'json'
            })
            .done( (data)=>{
                cb(data);
            } )
            .fail( (err)=>{
                console.log(err)
            });
        }
    }

    render(){
        let { whichPanel, hasLogin } = this.state;
        let changeInfoPanel = this.changeInfoPanel,
            changeLoginState = this.changeLoginState,
            handleUserLogin = this.handleUserLogin;
        let navProps = {
            hasLogin,
            changeInfoPanel,
            whichPanel,
            changeLoginState
        }
        let infoProps = {
            changeInfoPanel,
            whichPanel,
            handleUserLogin
        }

        return(
            <div className={style.wrap}>
                <Nav {...navProps}/>
                <div className={`container-fluid ${style.bd}`}>
                    <Info {...infoProps} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Index/>, document.querySelector('#root'));
