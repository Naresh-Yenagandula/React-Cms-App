import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { UserContext } from '../App';

function Login(props) {
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const [otpData, setOtp] = useState({ email: '', otp: '' })
    const [error, setError] = useState({ emailErrorMessage: '', passwordErrorMessage: '' })
    const value = useContext(UserContext)
    const [showOtp, setShowOtp] = useState({ email: false, otp: false })
    const [disable,setDisable] = useState({email:true,password:true})
    const [message,setMessage] = useState({message:"",color:""})

    useEffect(() => {
        if (value.isAuth) {
            props.history.push("/dashboard")
        }
    }, [value, props])


    const emailValidate=(e)=>{
        let emailError=""
        setLoginData({...loginData,email:e.target.value})
        if (!e.target.value) {
            emailError = "Email is required"
            setDisable({...disable,email:true})

        } else if (!loginData.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
            emailError = "Please enter a valid email"
            setDisable({...disable,email:true})
        }else{
            emailError=""
            setDisable({...disable,email:false})

        }
        setError({...error,emailErrorMessage:emailError})
    }
    
    // const emailValidateOtp=(e)=>{
    //     let emailError=""
    //     setOtp({...otpData,email:e.target.value})
    //     if (!e.target.value) {
    //         emailError = "Email is required"
    //         setDisable({...disable,email:true})

    //     } else if (!loginData.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
    //         emailError = "Please enter a valid email"
    //         setDisable({...disable,email:true})
    //     }else{
    //         emailError=""
    //         setDisable({...disable,email:false})

    //     }
    //     setError({...error,emailErrorMessage:emailError})
    // }

    const passwordValidate=(e)=>{
        let passwordError=""
        setLoginData({...loginData,password:e.target.value})
        if(!e.target.value){
            passwordError = "Password is required"
            setDisable({...disable,password:true})
        }else{
            passwordError=""
            setDisable({...disable,password:false})
        }
        setError({...error,passwordErrorMessage:passwordError})
    }

    const loginCheck = (e) => {
        e.preventDefault()
        if (!error.emailErrorMessage && !error.passwordErrorMessage) {
            axios.post("http://localhost:8081/authApi/login", loginData)
                .then((result) => {
                    localStorage.setItem('token', result.data)
                    value.callAuth()
                    props.history.push("/dashboard")
                })
                .catch((err) => {
                    setMessage({message:"User credentials does not match",color:"text-danger"})
                })
        }
    }

    const showOtpForm = () => {
        // setLoginData({email:'',password:''})
        // setOtp({email:'',otp:''})
        if (showOtp.email === false) {
            setShowOtp({ ...showOtp, email: true })
        } else if (showOtp.email === true) {
            setShowOtp({ ...showOtp, email: false })
        }
    }

    // const clearOtp=setTimeout(()=>{
    //     axios.put("http://localhost:8081/otp/clearOtp",otpData)
    //     .then((result)=>{
    //         console.log("otp cleared");
    //     })
    //     .catch((err)=>{
    //         console.log("err in clearing otp");
    //     })
    // },60*1000)

    const otpCreate = () => {
        setMessage({message:"",color:""})
        if (!otpData.email) {
            alert("Enter email")
        } else {
            axios.put("http://localhost:8081/otp/users", otpData)
                .then((result) => {
                    setShowOtp({ ...showOtp, otp: true })
                    setMessage({message:"OTP sent successfully",color:"text-success"})
                    // clearOtp()
                })
                .catch((err) => {
                    setMessage({message:"Something went wrong",color:"text-danger"})
                    console.log("Otp error");
                })
        }
    }

    const submitOtpData = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8081/otp/users", otpData)
            .then((result) => {
                localStorage.setItem('token', result.data)
                value.callAuth()
                props.history.push("/dashboard")
            })
            .catch((err) => {
                setMessage({message:'Invalid OTP',color:"text-danger"})
            })
    }
    return (
        <div style={{ paddingTop: "10%" }}>
            <style>{'body {background-color:#1995dc}'}</style>
            <Container>
                <Row>
                    <Col md={4}></Col>
                    <Col md={4} className="mt-4">
                        <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                            {showOtp.email ?
                                //login form for OTP
                                <Form onSubmit={submitOtpData} >
                                    <Card.Body>
                                        {message.message?<p className={message.color} style={{textAlign:"center"}}>{message.message}</p>:null}
                                        <Card.Title className=" text-center p-2">DCX CMS</Card.Title>
                                        <Form.Group>
                                            <Form.Control
                                                type="email"
                                                placeholder="eg. example@domain.com"
                                                // isInvalid={!!error.emailErrorMessage}
                                                // autoFocus
                                                disabled={showOtp.otp}
                                                onChange={e => setOtp({ ...otpData, email: e.target.value })}
                                            />
                                            {/* <Form.Control.Feedback title="emailError" type="invalid">{error.emailErrorMessage}</Form.Control.Feedback> */}
                                        </Form.Group>
                                        {showOtp.otp === true ?
                                            <>
                                                <Form.Group>
                                                    <Form.Control
                                                        title="otp"
                                                        type="text"
                                                        placeholder="Enter OTP"
                                                        // isInvalid={!!error.passwordErrorMessage}
                                                        onChange={e => setOtp({ ...otpData, otp: e.target.value })}
                                                    />
                                                    {/* <Form.Control.Feedback title="passwordError" type="invalid">{error.passwordErrorMessage}</Form.Control.Feedback> */}
                                                </Form.Group>
                                                <Button type="submit" block style={{ borderRadius: "20px" }} >SIGN IN</Button>
                                            </>
                                            : null}
                                        {showOtp.otp === false ?
                                            <Button block style={{ borderRadius: "20px" }} onClick={otpCreate}>Get OTP</Button> : null}
                                    </Card.Body>
                                </Form> :
                                //Login form for Password
                                <Form onSubmit={loginCheck} >
                                    <Card.Body>
                                    {message.message?<p className={message.color} style={{textAlign:"center"}}>{message.message}</p>:null}
                                        <Card.Title title="login" className=" text-center p-2">DCX CMS</Card.Title>
                                        <Form.Group>
                                            <Form.Control
                                                title="email"
                                                type="email"
                                                placeholder="eg. example@domain.com"
                                                isInvalid={!!error.emailErrorMessage}
                                                autoFocus
                                                onChange={emailValidate}
                                            />
                                            <Form.Control.Feedback title="emailError" type="invalid">{error.emailErrorMessage}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Control
                                                title="password"
                                                type="password"
                                                placeholder="Enter Password"
                                                isInvalid={!!error.passwordErrorMessage}
                                                onChange={passwordValidate}
                                            />
                                            <Form.Control.Feedback title="passwordError" type="invalid">{error.passwordErrorMessage}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Button title="sign" block type="submit" style={{ borderRadius: "20px" }} disabled={disable.email || disable.password}>SIGN IN</Button>
                                    </Card.Body>
                                </Form>}
                            {showOtp.email === false ?
                                <Button className="mb-3" size="sm" style={{ width: "150px", alignSelf: "center", borderRadius: "10px" }} onClick={showOtpForm}>Login with OTP</Button> :
                                <Button className="mb-3" size="sm" style={{ width: "150px", alignSelf: "center", borderRadius: "10px" }} onClick={showOtpForm}>Login with Password</Button>
                            }
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Login;