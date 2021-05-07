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

    useEffect(() => {
        if (value.isAuth) {
            props.history.push("/dashboard")
        }
    }, [value, props])

    const validate = () => {
        let emailError, passwordError = ''

        if (!loginData.email) {
            emailError = "Email id is Required"
        }
        if (!loginData.password) {
            passwordError = "Password is Required"
        }

        if (emailError || passwordError) {
            setError({ emailErrorMessage: emailError, passwordErrorMessage: passwordError })
            return false;
        }
        return true;
    }

    const loginCheck = (e) => {
        e.preventDefault()
        const isValid = validate();
        if (isValid) {
            axios.post("http://localhost:8081/authApi/login", loginData)
                .then((result) => {
                    localStorage.setItem('token', result.data)
                    value.callAuth()
                    props.history.push("/dashboard")
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    const showOtpForm = () => {
        if (showOtp.email === false) {
            setShowOtp({ ...showOtp, email: true })
        } else if (showOtp.email === true) {
            setShowOtp({ ...showOtp, email: false })
        }
    }

    const otpCreate = () => {
        if (!otpData.email) {
            alert("Enter email")
        } else {
            axios.put("http://localhost:8081/otp/users", otpData)
                .then((result) => {
                    console.log(result.data);
                    setShowOtp({ ...showOtp, otp: true })
                })
                .catch((err) => {
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
                console.log(err);
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
                                        <Card.Title title="login" className=" text-center p-2">DCX CMS</Card.Title>
                                        <Form.Group>
                                            <Form.Control
                                                title="email"
                                                type="email"
                                                placeholder="Enter your Email"
                                                // isInvalid={!!error.emailErrorMessage}
                                                autoFocus
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
                                        <Card.Title title="login" className=" text-center p-2">DCX CMS</Card.Title>
                                        <Form.Group>
                                            <Form.Control
                                                title="email"
                                                type="email"
                                                placeholder="Enter your Email"
                                                isInvalid={!!error.emailErrorMessage}
                                                autoFocus
                                                onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                                            />
                                            <Form.Control.Feedback title="emailError" type="invalid">{error.emailErrorMessage}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Control
                                                title="password"
                                                type="password"
                                                placeholder="Enter Password"
                                                isInvalid={!!error.passwordErrorMessage}
                                                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                                            />
                                            <Form.Control.Feedback title="passwordError" type="invalid">{error.passwordErrorMessage}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Button title="sign" block type="submit" style={{ borderRadius: "20px" }}>SIGN IN</Button>
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