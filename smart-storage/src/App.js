import React from 'react';
import Login from './Login/Login';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLogged: false,
        };

        this.handleLogin = this.handleLogin.bind(this);
    };

    handleLogin(){
        this.setState({isLogined:true});
        
    };

    render() {
        //или тут проверять локал сторадж на наличие токена, если нету - рендерить логин 
        //https://ru.reactjs.org/docs/conditional-rendering.html как раз тут пример


        return(
            <div className="App">
            <div>{this.state.isLogged.toString()}</div>
            <Login onLogin={this.handleLogin}/>
            </div>
        );
    };
};

export default App;