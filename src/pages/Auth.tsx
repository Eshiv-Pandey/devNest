import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImage from '@/assets/logo.png';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Supabase authentication here
    console.log('Form submitted:', formData);
    alert('Authentication functionality requires Supabase integration. Please connect to Supabase first!');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-smooth mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                src={logoImage} 
                alt="devNest Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold">
              <span className="text-logo-gray">dev</span>
              <span className="text-primary">Ne</span>
              <span className="text-logo-orange">st</span>
            </h1>
          </div>
          
          <h2 className="text-xl text-muted-foreground">
            {isSignUp ? 'Join the Community' : 'Welcome Back'}
          </h2>
        </div>

        {/* Form Card */}
        <Card className="shadow-hover">
          <CardHeader>
            <CardTitle className="text-center">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field for sign-up */}
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password for sign-up */}
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full gradient-primary text-primary-foreground shadow-soft"
                size="lg"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Button>

              {/* Forgot Password */}
              {!isSignUp && (
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-primary hover:text-primary-glow transition-smooth"
                    onClick={() => alert('Forgot password functionality requires Supabase integration!')}
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
            </form>

            {/* Toggle between sign-in and sign-up */}
            <div className="mt-6 text-center border-t border-border pt-6">
              <p className="text-sm text-muted-foreground">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              </p>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm font-medium text-primary hover:text-primary-glow transition-smooth"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Note about Supabase */}
        <div className="mt-6 p-4 bg-card/50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Note:</strong> Full authentication functionality requires Supabase integration. 
            Forms are ready - just connect to Supabase to enable user registration and login.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;