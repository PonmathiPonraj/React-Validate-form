import React, { useState, useReducer, useContext} from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from '../UI/Input/Input';

const Login = (props) => {
  const emailReducer=(state,action)=> {
    return {value: '', isValid: false}
  };
};

  const  authCtx = useContext(AuthContext);
  const {isValid:emailIsValid} = emailState;
  const {isValid:passwordIsValid} = passwordState;

  const emailChangeHandler = (event) => {
    const submitHandler = (event) => {
      event.preventDefault();
      authCtx.onLogin(emailState.value, passwordState.value);
    };

    return (
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <Input 
            id='email' 
            label="E-Mail"
            type="email" 
            isValid={emailIsValid} 
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
          <Input 
            id='password' 
            label="Password"
            type="password" 
            isValid={passwordIsValid} 
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}/>
         {/* <div
          className={`${classes.control} ${
            passwordState === false ? classes.invalid : ""
          }`}
          onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>  */}

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