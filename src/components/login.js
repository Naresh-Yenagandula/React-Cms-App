import axios from 'axios';
import React, { useContext, useState,useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { UserContext } from '../App';

function Login(props) {
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const [error, setError] = useState({ emailErrorMessage: '', passwordErrorMessage: '' })
    const value = useContext(UserContext)

    useEffect(() => {
        if(value.isAuth){
            props.history.push("/dashboard")
        }
    }, [value,props])

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
            axios.post("http://localhost:8081/authApi/login",loginData)
            .then((result)=>{
                localStorage.setItem('token',result.data)
                value.callAuth()
                props.history.push("/dashboard")
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }
    return (
        <div style={{ paddingTop: "10%" }}>
            <style>{'body {background-color:#1995dc}'}</style>
            <Container>
                <Row>
                    <Col md={4}></Col>
                    <Col md={4} className="mt-4">
                        <Card style={{ borderRadius:"10px",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                            <Form onSubmit={loginCheck} >
                                <Card.Body>
                                    <Card.Title className=" text-center p-2">DCX CMS</Card.Title>
                                    <Form.Group>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your Email"
                                            isInvalid={!!error.emailErrorMessage}
                                            autoFocus
                                            onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                                        />
                                        <Form.Control.Feedback type="invalid">{error.emailErrorMessage}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter Password"
                                            isInvalid={!!error.passwordErrorMessage}
                                            onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                                        />
                                        <Form.Control.Feedback type="invalid">{error.passwordErrorMessage}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Button block type="submit" style={{borderRadius:"20px"}}>SIGN IN</Button>
                                </Card.Body>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Login;