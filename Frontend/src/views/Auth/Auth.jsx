import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

const Auth = () => {
    const login = useGoogleLogin({
        redirect_uri: 'http://localhost:3000/api/auth/google/callback',
        onSuccess: (response) => {
            console.log(response)
            const { code } = response
            alert('Login successful')
            try {

                axios.get(`http://localhost:3000/api/auth/google/callback?code=${code}`).then((res) => {
                    console.log(res)
                })
            } catch (error) {
                console.error('Error during login:', error);
            }
        },
        onError: () => { },
        flow: 'auth-code',
        scope: "https://mail.google.com/ https://www.googleapis.com/auth/calendar profile email openid",
    })

    return (
        <main className="auth-main">
            <section className="auth-section">
                <button
                    onClick={login}
                >Continue with Google</button>
            </section>
        </main>
    )
}

export default Auth