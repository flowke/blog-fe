import { PropTypes, Component } from 'react';
import style from './nav.scss';

const propTypes = {
    brandUrl: PropTypes.string.isRequired
};

export default class Nav extends Component{
    render(){
        let { brandUrl } = this.props;
        return(
            <nav className={`navbar navbar-default navbar-fixed-top ${style.nav}`} role="navigation">
                <a href="#" className={`navbar-brand ${style.brand}`}>F</a>
                <div className={`collapse navbar-collapse navbar-left ${style.collection1}`} id="bs-example-navbar-collapse-1">
                    <ul className={`nav navbar-nav  ${style.navList}`}>
                        <li><span className={`glyphicon glyphicon-inbox`}></span></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

Nav.propTypes = propTypes;
