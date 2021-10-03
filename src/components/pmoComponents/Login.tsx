import React, { ReactElement, useState } from "react"
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Label,
    Form,
    Input,
    Button,
    Container,
} from "reactstrap"
import CSS from 'csstype';
import { getCircle, allianzBlue, structureNumberForDisplay, loginURL } from "../../globalVars"
import { Link, withRouter, useHistory } from "react-router-dom"





function Login(props): ReactElement {
    const history = useHistory()
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loginFailed, setLoginFailed] = useState<boolean>(false)

    const handleSubmit = () => {
        console.log("username" + "    " + username)
        console.log("password" + "    " + password)
        fetch(loginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(data => {
                return data.json()
            })
            .then(result => {
                if (result.login) {
                    props.login(true)
                    history.push("/dashboard/")
                } else {
                    setLoginFailed(true)
                }
                console.log(result.login)
            })
    }

    return (
        <div className="page-content">
            <Container>
                <Card >
                    <CardBody>
                        <Form>
                            <div className="row mb-4">
                                <Label
                                    htmlFor="horizontal-email-Input"
                                    className="col-sm-3 col-form-label"
                                >
                                    Username
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        //    type="email"
                                        className="form-control"
                                        id="horizontal-email-Input"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Col>
                            </div>
                            <div className="row mb-4">
                                <Label
                                    htmlFor="horizontal-password-Input"
                                    className="col-sm-3 col-form-label"
                                >
                                    Password
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        id="horizontal-password-Input"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    {loginFailed &&
                                        <Label
                                            htmlFor="horizontal-password-Input"
                                            className="col-form-label text-danger"
                                        >
                                            Username or Password wrong
                                </Label>}
                                </Col>
                            </div>
                            <div className="row justify-content-end">
                                <Col sm={9}>

                                    <div>
                                        <Button

                                            color="buttonPrimary"
                                            className="w-md"

                                            onClick={() => handleSubmit()}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </Col>
                            </div>
                        </Form>
                    </CardBody>
                </Card >
            </Container>
        </div>
    )
}

export default withRouter(Login)

