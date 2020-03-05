import React from 'react';
import { LoadableComponentState, LoadableOpt } from './propsType';

export default function loadable(opt: LoadableOpt): Function {

    return class LoadableComponent extends React.Component<any, LoadableComponentState> {
        constructor(props) {
            super(props);
            this.state = {
                loader: opt.loader,
                loading: opt.loading,
                delay: opt.delay || null,
                error: opt.error || null,
                overTime: opt.overTime || null,
                timeout: opt.timeout || null,
                status: 'padding',
                RenderComponent: null,
                callback: opt.callback || null
            }
        }

        private overTimer: number | null = null;
        private delayTimer: number | null = null;

        componentDidMount() {
            const { delay } = this.state;
            if (delay) {
                this.delayTimer = setTimeout(() => {
                    this.load();
                }, +delay)
            } else {
                this.load();
            }
        }

        componentWillUnmount() {
            this.clearDelayTimer();
            this.clearOverTimer();
        }

        isFunction(fn: any) {
            return Object.prototype.toString.call(fn) == '[object Function]';
        }

        load() {
            const { loader, timeout, callback } = this.state;
            if (loader) {
                this.setOverTimer(timeout);
                loader().then((components) => {
                    this.clearOverTimer();
                    this.setState({
                        RenderComponent: components.default,
                        status: 'done'
                    }, () => {
                        callback && this.isFunction(callback) && callback('done', null);
                    });
                }, (err) => {
                    this.clearOverTimer();
                    this.setState({
                        status: 'error'
                    }, () => {
                        callback && this.isFunction(callback) && callback('error', err);
                    });
                });
            }
        }

        setOverTimer(timeout) {
            if (!timeout) return;
            const { callback } = this.state;
            this.overTimer = setTimeout(() => {
                this.setState({
                    status: 'overTime'
                }, () => {
                    this.overTimer = null;
                    callback && this.isFunction(callback) && callback('overTime', null);
                })
            }, +timeout);
        }

        clearOverTimer() {
            if (this.overTimer) clearTimeout(this.overTimer);
            this.overTimer = null;
        }

        clearDelayTimer() {
            if (this.delayTimer) clearTimeout(this.delayTimer);
            this.delayTimer = null;
        }

        renderOtherStatusComponent(Component) {

            if (React.isValidElement(Component)) {
                return Component;
            }
            return <Component />
        }

        render() {
            const { RenderComponent, status, error, overTime, loading } = this.state;
            if (status == 'error') {
                return this.renderOtherStatusComponent(error)
            }
            if (status == 'overTime') {
                return this.renderOtherStatusComponent(overTime)
            }
            if (status == 'done' && RenderComponent) {
                return (<RenderComponent {...this.props} />)
            }
            return this.renderOtherStatusComponent(loading);
        }
    }
}