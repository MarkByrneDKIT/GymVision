import "./login.css"

export default function Login() {
    return (
        <div>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SetStats</h3>
                    <span className="loginDesc">AI assisted training!</span>

                </div>
                <div className="loginRight">
                    <div className="loginBox">
                    <form className="loginBox">
                        <input placeholder="Email" type="email" className="loginInput" />
                        <input
                            placeholder="Password"
                            className="loginInput"
                        />
                        <button className="loginButton" type='submit'>
                            Log In
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
