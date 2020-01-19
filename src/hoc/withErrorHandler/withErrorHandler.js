import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrapedComponent, axios) => {

    return class extends Component {
        state = {
            error: null
        }

        constructor() {
            super();

            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });

            this.responseInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({error});
                Promise.reject(error);
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <React.Fragment>
                    <Modal show={this.state.error} closed={this.errorConfirmedHandler}>{this.state.error && this.state.error.message}</Modal>
                    <WrapedComponent {... this.props}></WrapedComponent>
                </React.Fragment>
            );
        }
    }
}

export default withErrorHandler;