
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // For now, simulate successful login
    console.log('Login submitted:', values);
    
    toast({
      title: "Signed in successfully",
      description: "Welcome back to Investere!",
    });
    
    // Redirect to dashboard after successful sign-in
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md mx-auto flex flex-col justify-center p-8">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-full bg-blue-gradient flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="font-semibold text-xl tracking-tight">
              Investere
            </span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 px-6 py-8 rounded-lg shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          {...field} 
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-10 w-10"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm font-medium text-finance-blue hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-finance-blue hover:bg-blue-600">
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/sign-up" className="font-medium text-finance-blue hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-r from-finance-blue to-finance-teal opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1642033697055-c61cbe285ada?q=80&w=2073&auto=format&fit=crop')", mixBlendMode: "overlay" }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-lg text-white">
            <h2 className="text-3xl sm:text-4xl font-bold">AI-Powered Insights for Indian Markets</h2>
            <p className="mt-4 text-lg text-white/80">
              Access real-time analytics, predictions, and investment opportunities with our cutting-edge platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
