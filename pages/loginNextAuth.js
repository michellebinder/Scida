import { Router } from 'express';
import {useSession, SignIn} from 'next-auth/react';

const LoginForm =() => {
    const [session, loading] = useSession();

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const {username, password} = event.target.elements;
        await SignIn('ldap',{ username: username.valie, password: password.value} );

    };

    if (session){
        Router.push('/');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username"/>
            </label>
            <label>
                Password:
                <input type="password" name="password"/>
            </label>
            <button type="submit">Login</button>
        </form>
    );
}
export default LoginForm;