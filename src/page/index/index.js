
require('bootstrap');
require('bower_components/bootstrap/dist/css/bootstrap.min.css');
require('style/main.scss');
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
            infoPanel: 'userEntry'
        }

        this.changeInfoPanel = this.changeInfoPanel.bind(this);


    }

    changeInfoPanel(token){
    }

    render(){

        let { infoPanel } = this.state;
        return(
            <div className={style.wrap}>
                <Nav {...navProps}/>
                <div className={`container-fluid ${style.bd}`}>
                    <Info token={infoPanel} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Index/>, document.querySelector('#root'));
