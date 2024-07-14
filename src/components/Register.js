import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();
    const errRef = useRef();
    const userRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            alert('Utilizador registado com sucesso.');
            //navigate('/login');
        } else {
            alert('Falha ao registar.');
        }
    };

    return (
        <div className="flex justify-center xs:h-screen sm:h-screen md:h-auto lg:h-auto h-screen">
            <section className="xs:w-full sm:w-full md:w-1/2 lg:w-1/3 w-full bg-gray-100 rounded-lg p-8 flex flex-col xs:mt-0 sm:mt-0 md:mt-10 lg:mt-10">

                <h2 className="text-xl text-gray-900 font-medium mb-5">Registar</h2>

                <form onSubmit={handleSubmit}>
                <div className="relative mb-4">
                        <label htmlFor="username" className="leading-7 text-gray-600">
                            Username
                        </label>
                        <input 
                            type="text"
                            id="username"
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-outS"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            value={username}

                        />
  
                    </div>

                    <div className="relative mb-4">
                        <label htmlFor="password"  className="leading-7 text-gray-600">
                            Palavra-passe:
                        </label>
                        <input 
                            type="password"
                            id="password"
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-outS"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            value={password}

                        />
                    </div>

                    <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full">
                        Registar
                    </button>
                </form>

                <p className="text-sm text-gray-500 mt-3 self-center">
                    Já possui conta? <Link to="/login" className="text-indigo-500 hover:text-indigo-600"> Login</Link>
                </p>
            </section>
        </div>
    )

}

export default Register