// 此组件是容器组件
import Inbox from 'component/inbox/inbox.js';
import style from './info.scss';
export default ( {token, data} )=>{

    let component = null;
    let tit = '';
    switch(token){
        case 'inbox':
            component = data.map( (elt,indx)=>( <Inbox key={indx} data={elt}/>) );
            tit = 'Inbox';
            break;
    }
    return (
        <section className={`col-lg-4 ${style.section}`}>
            <header className={`${style.header}`}><h2 className={`page-header`}>{tit}</h2></header>
            <div className={`${style.wrap}`}>
                {component}
            </div>

        </section>
    );

}
