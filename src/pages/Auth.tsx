import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Auth = () => {
  const navigate = useNavigate();
  const { user, signUp, signIn, signInWithGoogle, loading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (isSignUp) {
      const { error } = await signUp(formData.email, formData.password, formData.fullName);
      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('This email is already registered. Please sign in.');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success('Account created successfully!');
        navigate('/');
      }
    } else {
      const { error } = await signIn(formData.email, formData.password);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success('Welcome back!');
        navigate('/');
      }
    }

    setSubmitting(false);
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error('Failed to sign in with Google. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-gold animate-pulse-gold">
          <Sparkles className="w-12 h-12" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-spotlight" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/3 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 animate-fade-in-up">
          <Link to="/" className="inline-block group">
            <h1 className="text-5xl font-display font-bold text-gradient-gold mb-2 transition-transform duration-500 group-hover:scale-105">
              RATNAYA
            </h1>
          </Link>
          <p className="text-muted-foreground font-body text-lg">Luxury Jewelry Collection</p>
        </div>

        <div className="bg-card/80 backdrop-blur-xl border border-gold/20 rounded-2xl p-8 shadow-elegant animate-scale-in hover-glow">
          <h2 className="text-2xl font-display text-cream text-center mb-6">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>

          {/* Google Sign In Button */}
          <Button 
  type="button"
  variant="outline" 
  size="lg" 
  className="w-full mb-6 h-12 font-body text-base border-gold/30 hover:bg-gold/10 hover:border-gold transition-all duration-300"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    handleGoogleSignIn();
  }}
>
  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
    ...
  </svg>
  Continue with Google
</Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gold/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground font-body">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="fullName" className="text-cream font-body">Full Name</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-gold" />
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required={isSignUp}
                    className="bg-muted/50 border-gold/20 text-cream pl-12 h-12 rounded-xl focus:border-gold focus:ring-gold/30 transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-cream font-body">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-gold" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-muted/50 border-gold/20 text-cream pl-12 h-12 rounded-xl focus:border-gold focus:ring-gold/30 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-cream font-body">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-gold" />
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                  className="bg-muted/50 border-gold/20 text-cream pl-12 h-12 rounded-xl focus:border-gold focus:ring-gold/30 transition-all duration-300"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              variant="gold" 
              size="lg" 
              className="w-full h-12 text-base font-semibold shadow-gold-lg hover:shadow-gold transition-all duration-300"
              disabled={submitting}
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Please wait...
                </span>
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-gold hover:text-gold-light font-body transition-colors duration-300"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>

        <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Link to="/" className="text-muted-foreground hover:text-gold font-body transition-colors duration-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;