import Validator from 'util/validation.js'
import style from './userEntry.scss';

export default class UserEntry extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            forUser: '',
            forPwssw: '',
            forCfpwssw: '',
            userVal:'',
            passwVal:'',
            cfpasswVal:'',
            canSubmit: false
        };

        this.canSubmit = [false,false,false];

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
            forUser: '',
            forPwssw: '',
            forCfpwssw: '',
            userVal:'',
            passwVal:'',
            cfpasswVal:'',
            canSubmit: true
        });
        this.props.changePanel(token);

    }

    handleSubmit(ev){
        ev.stopPropagation();
        ev.preventDefault();
        let {isLogin, handleLogin, handleSignin} = this.props;
        let {userVal, passwVal, cfpasswVal} = this.state;
        if(this.state.canSubmit){
            isLogin? handleLogin({userVal, passwVal})
            : handleSignin({userVal, passwVal, cfpasswVal});
        }
    }

    //提交前的前端验证
    validValue(token, ev){
        let {userVal, passwVal, cfpasswVal} = this.state;
        let boolArr = this.canSubmit;
        let msg = '';
        switch(token){
            case 'username':
                userVal = ev.target.value;
                this.setState({userVal})
                msg = this.validator.valiOneByValue('username', userVal);
                if(msg){
                    this.setState({forUser: 'has-error'});
                    boolArr[0] = false;
                }else{
                    this.setState({forUser: 'has-success'});
                    boolArr[0] = true;
                }
                break;
            case 'passw':
                passwVal = ev.target.value;
                this.setState({passwVal});
                msg = this.validator.valiOneByValue('passw',passwVal);
                if(msg){
                    this.setState({forPwssw: 'has-error'});
                    boolArr[1] = false;
                }else{
                    this.setState({forPwssw: 'has-success'});
                    boolArr[1] = true;
                }
                break;
            case 'cfpassw':
                cfpasswVal = ev.target.value;
                this.setState({cfpasswVal});
                if(cfpasswVal !== passwVal){
                    this.setState({forCfpwssw: 'has-error'});
                    boolArr[2] = false;
                }else{
                    this.setState({forCfpwssw: 'has-success'});
                    boolArr[2] = true;
                }
        }
        this.setState({
            canSubmit: boolArr.every(elt=>elt)
        });
    }

    componentDidMount(){
        this.validator.addByValue('username',[
            {strategy: 'isEmpty', errorMsg:'用户名不能为空'},
            {strategy: 'hasSpace', errorMsg:'不能有空格'},
            {strategy: 'isNumberHead', errorMsg:'不能数字开头'}
        ]);
        this.validator.addByValue('passw',[
            {strategy: 'isEmpty', errorMsg:'用户名不能为空'},
            {strategy: 'hasSpace', errorMsg:'不能有空格'},
        ]);
    }

    render(){
        let { isLogin, handleLogin } = this.props;
        let {forUser, forPwssw, forCfpwssw, userVal, passwVal, cfpasswVal} = this.state;
        let cfPassw = null;
        if(!isLogin){
            cfPassw = (
                <div className={`form-group ${forCfpwssw}`}>
                    <div className="input-group input-group-lg">
                        <div className="input-group-addon">
                            <span className='glyphicon glyphicon-lock'></span>
                        </div>
                        <input
                            type="password" onChange={this.validValue.bind(this,'cfpassw')} className={`form-control`} name="cfPassw"
                            placeholder="Confirm password"
                            value={cfpasswVal}
                        />
                    </div>
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
                        <div className={`form-group ${forUser}`}>
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
                                    value = {userVal}
                                />
                            </div>
                        </div>
                        <div className={`form-group ${forPwssw}`}>
                            <div className="input-group input-group-lg">
                                <div className="input-group-addon">
                                    <span className='glyphicon glyphicon-lock'></span>
                                </div>
                                <input
                                    type="password"
                                    onChange={this.validValue.bind(this,'passw')} className={`form-control`}
                                    placeholder="password"
                                    name="passw"
                                    value={passwVal}
                                />
                            </div>
                        </div>
                        {cfPassw}
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
