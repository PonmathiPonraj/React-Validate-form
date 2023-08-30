import React, {  useState, useReducer } from "react";
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {

    const emailReducer=(state,action)=>{
        if(action.type==='USER_INPUT'){
            return{value:action.val,isValid:action.val.includes('@')};
        }
        if(action.type==='INPUT_BLUR'){
            return{value:state.value ,isValid:state.value.includes('@')};
        }
        return {value:'',isValid:false};
    };


    const passwordReducer=(state,action)=>{
        if(action.type==='User_Input'){
            return{value:action.val,isValid:action.val.trim().length>6};
        }
        if(action.type==='Input_Blur'){
            return{value:state.value,isValid:state.value.trim().length>6}
        }
        return {value:'',isValid:false}
};

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmail]=useReducer(emailReducer,{
    value:'',
    isValid:false})
    const [passwordState,dispatchPassword]=useReducer(passwordReducer,{
     value:'',
     isValid:false
    })

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT',val:event.target.value})

    setFormIsValid(
        event.target.value.includes('@') && event.target.value.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'User_Input',val:event.target.value})

    setFormIsValid(
       emailState.isValid && passwordState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:"INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    dispatchEmail({type:'Input_Blur'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        { /* {<div
          className={`${classes.control} ${
            collegeNameIsValid === false ? classes.invalid : ""
          }`}
          onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div> */}
        <div
          className={`${classes.control} ${
            passwordState === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> 

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
          </div>
      </form>
    </Card>
  );
};
export default Login;