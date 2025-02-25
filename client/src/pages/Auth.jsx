import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const navigate = useNavigate();
    const { login, register, loading, error } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLogin && formData.password !== formData.confirmPassword) return;

        const success = isLogin
            ? await login(formData.email, formData.password)
            : await register(formData.username, formData.email, formData.password);

        if (success) {
            isLogin ? navigate('/') : setIsLogin(true);
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input type="text" placeholder="Username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
                )}
                <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                {!isLogin && (
                    <input type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required />
                )}
                <button type="submit" disabled={loading}>{loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Need an account? Register' : 'Already have an account? Login'}</button>
        </div>
    );
};

export default Auth;
