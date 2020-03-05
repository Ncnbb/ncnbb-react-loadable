export interface LoadableComponentState{
    loader: Function
    loading?: null | string | JSX.Element
    RenderComponent: null | React.ComponentClass
    timeout?: null | string | JSX.Element
    error?: null | string | JSX.Element
    delay?: number | null
    overTime?:  number | null
    status: 'padding' | 'error' | 'done' | 'overTime'
    callback?: null | Function
}

export interface LoadableOpt {
    loader: Function
    loading?: null | string | JSX.Element
    timeout?: null | string | JSX.Element
    error?: null | string | JSX.Element
    delay?: number | null
    overTime?:  number | null
    callback?: null | Function
}