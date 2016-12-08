
require('bootstrap');
require('bower_components/bootstrap/dist/css/bootstrap.min.css');
require('style/main.scss');
import style from './index.scss';

import Nav from 'component/nav/nav.js';
import Info from 'component/info/info.js';

let navProps = {
    brandUrl: './img/curly-brackets.png'
}

let infoData = [{
    id: '1',
    title: '非豆科绿肥',
    user: 'flowke',
    time: 'fdlkfslk',
    read: 30,
    comment: 89,
    like: 77,
}];

for(let i=0; i<40; i++){
    infoData.push(infoData[0]);
}

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            infoType: 'inbox',
            infoData: infoData
        }
    }

    render(){

        let { infoType, infoData } = this.state;

        return(
            <div className={style.wrap}>
                <Nav {...navProps}/>
                <div className={`container-fluid ${style.bd}`}>
                    <Info token={infoType} data={infoData}/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Index/>, document.querySelector('#root'));
