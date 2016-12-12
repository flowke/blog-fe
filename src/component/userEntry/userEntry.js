import Validator from 'util/validation.js';
import config from 'config/config.json';
import style from './userEntry.scss';

let initState = {
    hintState: {
        username: '',
        passw: '',
        cfpassw: ''
    },
    value: {
        username: '',
        passw: '',
        cfpassw:''
    },
    wrongMsg : {
        username: false,
        passw: false,
        cfpassw: false
    }
};

export default class UserEntry extends React.Component{

    constructor(props){
        super(props);

        this.state = Object.assign({},initState);

        this.validator = new Validator();

        this.changePanel = this.changePanel.bind(this);
        this.validValue = this.validValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    // 到底是注册还是登陆
    changePanel(token,ev){

        ev.stopPropagation();
        ev.preventDefault();

        this.setState({
            hintState: {
                username: '',
                passw: '',
                cfpassw: ''
            },
            value: {
                username: '',
                passw: '',
                cfpassw:''
            },
            wrongMsg : {
                username: false,
                passw: false,
                cfpassw: false
            }
        });
        this.props.changePanel(token);
    }

    handleSubmit(ev){
        ev.stopPropagation();
        ev.preventDefault();
        let {isLogin, handleUserLogin} = this.props;
        let {username, passw, cfpassw} = this.state.value;
        let wrongMsg = {},
            hintState = {};
        let canSubmit = true;

        this.validator.valiByValue({
            username,
            passw
        },(name,msg)=>{
            wrongMsg[name] = msg;
            hintState[name] = 'has-error';
            canSubmit = false;
        });

        if(!isLogin && (passw !== cfpassw) ){
            wrongMsg.cfpassw = "密码不一致";
            hintState.cfpassw = 'has-error';
            canSubmit = false;
        }

        this.setState({
            wrongMsg,
            hintState
        })

        if( canSubmit){
            handleUserLogin(isLogin, {username, passw, cfpassw},({code,msg})=>{
                if(isLogin){
                    if(code===1){
                        wrongMsg.username = msg;
                        hintState.username = 'has-error';
                    }else if(code===2){
                        wrongMsg.passw = msg;
                        hintState.passw = 'has-error';
                    }
                    if(code !== 0){
                        this.setState({wrongMsg, hintState});
                    }
                }else{
                    if(code === 1){
                        wrongMsg.username = "用户名已存在";
                        hintState.username = 'has-error';
                    }else if(code===0){
                        this.props.changePanel(true);
                    }
                    this.setState({wrongMsg, hintState});
                }
            })
        }
    }

    //提交前的前端验证提示
    validValue(token, ev){
        let {value, hintState, wrongMsg} = this.state;
        let {isLogin} = this.props;

        let curtVal = value[token] = ev.target.value;
        wrongMsg[token] = '';
        hintState[token] = '';
        if(token !== 'cfpassw'){

            this.validator.valiOneByValue(token, curtVal,(msg)=>{
                hintState[token] = 'has-error';
                wrongMsg[token] = msg;
            });
        }

        this.setState({hintState,wrongMsg});
    }

    componentDidMount(){

        let {isLogin} = this.props;

        this.validator.addByValue('username',[
            {strategy: 'isEmpty', errorMsg:'用户名不能为空'},
            {strategy: 'hasSpace', errorMsg:'不能有空格'},
            {strategy: 'isNumberHead', errorMsg:'不能数字开头'},
            {strategy: 'mustAllW', errorMsg:'用户名只能由字母,数字,下划线( _ )组成'},
            {strategy: 'maxLength:16', errorMsg:'不能超过12位'}
        ]);
        this.validator.addByValue('passw',[
            {strategy: 'isEmpty', errorMsg:'密码不能为空'},
            {strategy: 'hasSpace', errorMsg:'不能有空格'},
        ]);
    }

    render(){
        let { isLogin, handleLogin } = this.props;
        let {hintState, value, wrongMsg} = this.state;
        let cfPasswComponent = null;
        if(!isLogin){
            cfPasswComponent = (
                <div className={`form-group ${hintState.cfpassw}`}>
                    <div className="input-group input-group-lg">
                        <div className="input-group-addon">
                            <span className='glyphicon glyphicon-lock'></span>
                        </div>
                        <input
                            type="password"
                            onChange={this.validValue.bind(this,'cfpassw')}
                            className={`form-control`} name="cfPassw"
                            placeholder="Confirm password"
                            value={value.cfpassw}
                        />
                    </div>
                    {wrongMsg.cfpassw?<span className="help-block">{wrongMsg.cfpassw}</span>:""}
                </div>
            );
        };
        return (
            <section className={`${style.section}`}>
                <header className={`${style.header}`}>
                    <span className={isLogin ? 'text-primary' : 'text-muted'} onClick={this.changePanel.bind(this, true)}> 登陆 </span>·
                    <span className={isLogin ? 'text-muted' : 'text-primary'} onClick={this.changePanel.bind(this, false)}> 注册 </span>
                </header>
                <div>
                    <form className={style.form} onSubmit={this.handleSubmit} role="form">
                        <div className={`form-group ${hintState.username}`}>
                            <div className="input-group input-group-lg">
                                <div className="input-group-addon">
                                    <span className='glyphicon glyphicon-user'></span>
                                </div>
                                <input type="text"
                                    onChange={this.validValue.bind(this,'username')}
                                    className={`form-control`}
                                    id="username"
                                    name="username"
                                    placeholder="username"
                                    value = {value.username}
                                />
                            </div>
                            {wrongMsg.username?<span className="help-block">{wrongMsg.username}</span>:""}
                        </div>
                        <div className={`form-group ${hintState.passw}`}>
                            <div className="input-group input-group-lg">
                                <div className="input-group-addon">
                                    <span className='glyphicon glyphicon-lock'></span>
                                </div>
                                <input
                                    type="password"
                                    onChange={this.validValue.bind(this,'passw')}
                                    className={`form-control`}
                                    placeholder="password"
                                    name="passw"
                                    value={value.passw}
                                />
                            </div>
                            {wrongMsg.passw?<span className="help-block">{wrongMsg. passw}</span>:""}
                        </div>
                        {cfPasswComponent}
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-success btn-lg btn-block">
                                {isLogin ? 'Login' : 'Sign in'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}
