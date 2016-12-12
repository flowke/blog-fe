import { PropTypes, Component } from 'react';
import style from './nav.scss';

const propTypes = {
};

export default class Nav extends Component{

    constructor(props){
        super(props);
    }

    navBarClick(token,ev){
        ev.stopPropagation();
        ev.preventDefault();

        this.props.changeInfoPanel(token);
    }
    userEntryClick(){
        let {hasLogin, changeLoginState, changeInfoPanel} = this.props;
        if(hasLogin){
            console.log('logOut');
            changeInfoPanel('home');
            changeLoginState(false)
        }else{
            changeInfoPanel('userEntry');
        }

    }

    componentDidMount(){
        let { inbox, login } = this.refs;
        $([inbox,login]).tooltip();
    }

    render(){
        let {hasLogin, whichPanel} = this.props;
        let {active, userAct} = style;
        console.log(hasLogin)
        return(
            <nav className={`navbar navbar-default navbar-fixed-top ${style.nav}`} role="navigation">
                <div className={`collapse navbar-collapse navbar-left ${style.collection1}`} id="bs-example-navbar-collapse-1">
                    <ul className={`nav navbar-nav  ${style.navList} ${style.top} `}>
                        <li className={whichPanel==='home'? active: ''}
                            onClick={this.navBarClick.bind(this, 'home')} >
                            <span href="#" className={`${style.brand} `}>F</span>
                        </li>
                        <li
                            className={whichPanel==='inbox'? active: ''}
                            onClick={this.navBarClick.bind(this, 'inbox')}
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Inbox"
                            ref="inbox">
                            <span className={`glyphicon glyphicon-inbox`}></span>
                        </li>
                    </ul>
                    <ul className={`nav navbar-nav ${style.navList} ${style.bottom}`}>
                        <li
                            className={whichPanel==='userEntry'? userAct:''}
                            onClick={this.userEntryClick.bind(this)}
                            data-toggle="tooltip"
                            data-placement="right"
                            title={hasLogin? '注销':'登录'}
                            ref="login">
                            <span
                                className={`glyphicon ${hasLogin?'glyphicon-log-in':'glyphicon-user'}`}>
                            </span>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

Nav.propTypes = propTypes;
