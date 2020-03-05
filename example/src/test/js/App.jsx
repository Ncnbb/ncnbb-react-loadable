import React from 'react';
import loadable from '../../../../es/index.jsx';
import Skeleton from 'zzc-design-mobile/lib/Skeleton';
function Error () {
    return (
        <div>获取模块失败！</div>
    );
}


function OverTime () {
    return (
        <div>获取模块超时！</div>
    );
}

function Loading () {
    return (
        <Skeleton>
            <Skeleton.Box justify='space-between'>
                <Skeleton.Item height='34px' width='100px' />
                <Skeleton.Item height='34px' width='80px' />
            </Skeleton.Box>
            <Skeleton.Box style={{ marginTop: '20px' }}>
                <Skeleton.Item height='34px' width='100%' />
            </Skeleton.Box>
            <Skeleton.Box style={{ marginTop: '20px' }}>
                <Skeleton.Item height='54px' width='100%' />
            </Skeleton.Box>
        </Skeleton>
    );
}

const LoadableComponent = loadable( {
    loader: () => import( './Sub.jsx' ),
    loading: Loading,
    timeout: 2000,
    delay: 3000,
    error: Error,
    callback: (status, error) => {console.log(status)},
    overTime: <OverTime />
} );

export default class App extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            num: 1
        }
        this.click = this.click.bind( this );
    }

    click () {
        this.setState( {
            num: ++this.state.num
        } )
    }

    render () {
        return (
            <div>
                <h1>1231231</h1>
                <button onClick={this.click}>按钮</button>
                <LoadableComponent num={this.state.num} text='这是一个加载后的内容' />
            </div>
        );
    }
}