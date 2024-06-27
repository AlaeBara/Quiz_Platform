import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css';

function Login() {
    const history = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState(null);

    async function submit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/login", {
                id,
                password
            });

            if (response.data.status === "success") {
                // Store the token in localStorage
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("id", response.data.info.Id);
                localStorage.setItem("filier", response.data.info.Filier);
                history("/home");
            }
            else if (response.data.status === "success_admin") {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("id", response.data.info.Id);
                history("/admin_home");
            }
            else if (response.data.status === "failure") {
                setResult("User has not signed up");
            }
            else {
                setResult('Please fill in all required fields.');
            }
        } catch (error) {
            console.error("Error occurred:", error);
            alert("Wrong details");
        }
    }

    return (
        <div className="container">
            <div>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Id Etudiant</label>
                        <input className="input_login form-control" type="email" onChange={(e) => setId(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input className="input_login form-control" type="password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <p style={{ color: "red", textAlign: "center" }}>{result}</p>
                    <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
                </form>
            </div>
            <footer>
                <div>
                    <p>© 2024 Alaeddine Bara - Yahya Agouzoul (ESTE). Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
}

export default Login;
