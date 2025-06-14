import React from 'react'
import Signup from './Signup'
import {Link} from 'react-router-dom'
function Login() {
    return (
        <div>
            <Link to="/Signup">
                <button>
                    get  started
                </button>
            </Link>
        </div>
    )
}

export default Login
