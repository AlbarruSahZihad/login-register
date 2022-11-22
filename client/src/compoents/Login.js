import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Axios from 'axios'

Axios.defaults.withCredentials = true;

function Login() {
    const[username,setUsename] =useState('');
    const[password,setPassword] =useState('');
    const[status,setStatus] = useState('')
    const[msgusername,setMsgusername] =useState('');
    const[msgpassword,setMsgpassword] =useState('');
    let navigate = useNavigate();


    // function untuk handle proses login
    const Login = () =>{
        //cek usename
        if(username === ''){
            setMsgusername("maaf pak tolong di isi")
        }
        // cek password
        else if (password === ''){
            setMsgpassword("passwordnya juga dong")
            setMsgusername("")
        }else{
            Axios.post("http://localhost:30001/login",{
                username: username,
                password: password,
            } ).then((respnose) => {
                if(respnose.data.massage) {
                    setStatus(respnose.data.massage);
                }else {
                    sessionStorage.setItem('token',respnose.data);
                    navigate('/dashboard')
                }
            } )
        }
    }

    useEffect(() => {
        if(sessionStorage.getItem("token") === null) {
            navigate('/');
        }else {
            navigate('/deshboard')
        }
    }, [navigate])



    return ( 
        <>
        <div className='container'>
            <div className='container py-5'>
                <h1 className='text-muted'>LOGIN</h1>
                <p className='text-muted'>
                    Please Login to Authentincate
                </p>
            </div>
            <hr/>
            <div className='form-group'>
                <label>Username:</label>
                <input type='text'  className='form-control' onChange={(e => {
                    setUsename(e.target.value) })}/>
                <b className='text-danger'>{msgusername}</b>
            </div>

            <div className='form-group'>
                <label>Password   :</label>
                <input type='password'className='form-control' onChange={(e => {
                    setPassword(e.target.value) })}/>
                    <b className='text-danger'>{msgpassword}</b>
            </div>

            <div className='form-group'>
            <button className='btn btn-primary mt-3 mb-2' onClick={Login}>
                Login
            </button>
            </div>

            <p>
                Don't have  Account? please <Link to='/register'>Register Click Here!!</Link> 
            </p>
            </div>
        </>
     );
}

export default Login;