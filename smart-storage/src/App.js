import React from 'react';
import Login from './Login/Login';
import 'antd/dist/antd.css';
import Main from './Main/Main';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLogged: false,
        };

        this.handleLogin = this.handleLogin.bind(this);
    };

    componentDidMount(){
        //checking for token in localstorage
        if(localStorage.getItem('token') && localStorage.getItem('userId')){
            this.setState({isLogged: true});
        };
    }

    handleLogin(){
        this.setState({isLogged:true});
    };

    render() {
        //или тут проверять локал сторадж на наличие токена, если нету - рендерить логин 
        //https://ru.reactjs.org/docs/conditional-rendering.html как раз тут примерр
        if(!this.state.isLogged){
            return(
                <div className="App">
                    {this.state.isLogged.toString()}
                <Login onLogin={this.handleLogin}/>
                </div>
            );
        } else {
            return(
                
                <div className="App">
                    <Main />
                </div>
            );
        };
        
    };
};

export default App;