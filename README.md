<h1 align="center">ncnbb-react-loadable</h1>
<p align="center">React异步加载组件</p>
<p align='center'>
<img alt='npm' src='https://img.shields.io/npm/v/ncnbb-react-loadable'/>
<img alt='NPM' src='https://img.shields.io/npm/l/ncnbb-react-loadable'/>
<img alt='team' src='https://img.shields.io/badge/team-Ncnbb-yellow'/>
</p>

### 简介
基于React封装的统一处理异步加载组件的加载器组件，能更贴合React开发的方式处理异步加载组件的逻辑，对加载失败，加载超时，加载中和加载成功进行处理。

### 安装

```shell
npm install ncnbb-react-loadable
```

### 使用须知
- 项目目录下，必须配置`@babel/plugin-syntax-dynamic-import`插件，让`webpack`处理`import()`特殊Api
- 被加载的组件必须使用`export default`进行导出
- 需要使用react16版本及以上

### 参数

| 属性     | 说明                                  | 类型                                                                | 默认值 |
| -------- | ------------------------------------- | ------------------------------------------------------------------- | ------ |
| loader   | 异步获取组件函数，必须返回一个promise | Function                                                            | 必传   |
| loading  | 加载中展示组件                        | JSX.Element、JSX.Component                                          | null   |
| error    | 加载错误展示组件                      | JSX.Element、JSX.Component                                          | null   |
| overTime | 加载超时展示组件                      | JSX.Element、JSX.Component                                          | null   |
| timeout  | 超时时间                              | number                                                              | null   |
| delay    | 延迟加载时间                          | number                                                              | null   |
| callback | 状态回调                              | Function(status: 'done'\|'error'\|'overTime', error: Error \| null) | null   |


### 实例

```jsx

import loadable from 'ncnbb-react-loadable';

const LoadableComponent = loadable( {
    loader: () => import( './Sub.jsx' ),
    loading: Loading,
    timeout: 2000,
    delay: 3000,
    error: Error,
    callback: (status, error) => {console.log(status)},
    overTime: <OverTime />
} );

render () {
    return (
        <div>
            <LoadableComponent num={this.state.num} text='这是一个加载后的内容' />
        </div>
    );
}

```






