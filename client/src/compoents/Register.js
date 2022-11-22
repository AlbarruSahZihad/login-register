import { useState } from 'react';
import { Link} from 'react-router-dom'
import Axios from 'axios'


function Register() {
    const[username,setUsename] =useState('');
    const[password,setPassword] =useState('');
    const[nama,setNama] =useState('');
    const[msgusername,setMsgusername] =useState('');
    const[msgpassword,setMsgpassword] =useState('');
    const[msgnama,setMsgNama] =useState('');


    // function untuk handle proses login
    const Login = () =>{
        //cek usename
        if(username === ''){
            setMsgusername("maaf pak ini tolong di isi")
        }
        // cek password
        else if (password === ''){
            setMsgpassword("passwordnya juga dong")
        }else if(nama === ''){
            setMsgNama("haduh gimana sih bapak ?")
        }else{
            //proses  Register ketika data sudah terval
            // console.log(username, password, nama);

            Axios.post("http://localhost:3001/register",{
                username: username,
                password: password,
                nama: nama,
            }).then((response) => {
                console.log(response);
            });
        }
    }


    return ( 
        <>
        <div className='container'>
            <div className='container py-5'>
                <h1 className='text-muted'>REGISTER</h1>
                <p className='text-muted'>
                    Please Create To Authentincate
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
                <label>Nama   :</label>
                <input type='text'className='form-control' onChange={(e => {
                    setNama(e.target.value) })}/>
                    <b className='text-danger'>{msgnama}</b>
            </div>

            {/* <div className='form-group'>
                <label>biodata  :</label>
                <input type='text' className='form-control' onChange={(e => {
                    setData(e.target.value)})}/>
                    <b className='text-danger'>{data}</b>
            </div> */}

            <div className='form-group'>
            <button className='btn btn-primary mt-3 mb-2' onClick={Login}>
                Register
            </button>
            </div>

            <p>
                have an Account? please <Link to='/'>Login</Link> 
            </p>
            </div>
        </>
     );
}

export default Register;