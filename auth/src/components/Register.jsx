import { createClient } from '@supabase/supabase-js'
import '../Style.css/Register.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from '../Api/axios';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/Register'
const supabase = createClient("https://ewmlbtuoknunmdychans.supabase.co", "<eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3bWxidHVva251bm1keWNoYW5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5Nzc0OTYsImV4cCI6MjAwODU1MzQ5Nn0.YozgzLRU1tLo8t54CzlBZA9tiGXUtlQfeZm4VuJg_1g");


const Register = () => {
  const userRef = useRef();
    const errRef = useRef();

  const[user, setUser] = useState('');
  const[validName, setValidName] = useState(false);
  const[userFocus, setUserFocus] = useState(false);

  const[pwd, setPwd] = useState('');
  const[validPwd, setValidPwd] = useState(false);
  const[pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const[matchFocus, setMatchFocus] = useState(false);

  const[errMsg, setErrMsg] = useState('');
  const[success, setSuccess] = useState(false);
  const[list, setList] = useState(['']);

  useEffect(() => {
    userRef.current.focus();
}, [])

useEffect(() => {
    setValidName(USER_REGEX.test(user));
}, [user])

useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result)
    console.log(pwd);
    setValidPwd(result)
    const match = pwd === matchPwd;
    setValidMatch(match);
},[pwd,matchPwd])

useEffect(() => {
    setErrMsg('');
}, [user, pwd, matchPwd])


useEffect(() =>{
  getDb();
},[]);
async function getDb(){
  const {data} = await supabase.from('mydb').select();
  setList(data);
}

const handleSubmit = async (e)=> {
  e.preventDefault();
  const v1 = USER_REGEX.test(user);
  const v2 = PWD_REGEX.test(pwd);
  if(!v1 || !v2){
    setErrMsg('Invalid Entry');
    return
  }
  try{
    const response = await axios.post(REGISTER_URL,
      JSON.stringify({user, pwd}),
      {
        headers: {'Content-Type': 'application/son'},
        withCredentials: true
      } 
    );
    console.log(response.data);
    console.log(response.accessToken)
    setSuccess(true)
  } catch(err){
    if(!err?.response){
      setErrMsg('NO server Response');
    }
    else if(err.response?.status === 409){
      setErrMsg('Username Taken');
    }
    else{
      setErrMsg('Registration Failed')
    }
    errRef.current.focus();
  }
}
  
  return (
    <div className='bg'>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <div className='glass'>
        <form className='sign-up' id='tuff' onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className='username'>
            <label htmlFor='username'
              >Username:
              <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
            </label>
            <input
             type='text'
             id='username'
             autoComplete = 'off'
             ref={userRef}
             onChange={(e) => setUser(e.target.value)}
             required
             aria-invalid={validName? 'false': 'true'}
             aria-describedby='uidnote'
             onFocus={()=> setUserFocus(true)}
             onBlur={()=> setUserFocus(false)}
             placeholder='Enter user Name'
             />
              <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                   Letters, numbers, underscores, hyphens allowed.
              </p>
          </div>
          <div className='pass'>
            <label htmlFor='password'>
              Password:
              <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
            </label>
            <input 
            placeholder='Enter Password'
            onChange={(e)=> setPwd(e.target.value)}
            type = 'password'
            id='password'
            value={pwd}
            required
            aria-invalid = {validPwd? 'false': 'true'}
            aria-describedby='pwdnote'
            onFocus={()=> setPwdFocus(true)}
            onBlur={()=> setPwdFocus(false)}
            />
            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number and a special character.<br />
              Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>
            <div className='cpass'>
            <label htmlFor="confirm_pwd">
              Confirm:
              <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              placeholder='Confirm password'
            />
          </div>
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
               Must match the first password input field.
            </p>
          </div>
          <div className='remember'>
            <label><input type='checkbox'></input> Remember Me</label>
            <a href=''>Forgot Password</a>
          </div>
          <button disabled={!setValidName || !validPwd|| !validMatch? true : false}className='btn'>Log In</button>
          <p>Dont have an account?<Link to="/Signup">Sign Up</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Register
