
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, ArrowRight, User, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const baseFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' }),
  confirmPassword: z.string(),
  userType: z.enum(['investor', 'startup']),
});

const investorFormSchema = baseFormSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const startupFormSchema = baseFormSchema.extend({
  companyName: z.string().min(2, { message: 'Company name is required.' }),
  industry: z.string().min(2, { message: 'Industry is required.' }),
  stage: z.string().min(2, { message: 'Funding stage is required.' }),
  description: z.string().min(10, { message: 'Please provide a brief description of your startup.' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type FormValues = z.infer<typeof startupFormSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'investor' | 'startup'>('investor');

  const form = useForm<FormValues>({
    resolver: zodResolver(userType === 'investor' ? investorFormSchema : startupFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'investor',
      companyName: '',
      industry: '',
      stage: '',
      description: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log('Signup submitted:', values);
    
    toast({
      title: "Account created successfully",
      description: "Welcome to Investere! Please check your email to verify your account.",
    });
    
    // Redirect to dashboard after successful sign-up
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
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
          <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Create your account</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Join Investere to access AI-powered financial analytics
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 px-6 py-8 rounded-lg shadow-md">
          <div className="flex mb-6 gap-2">
            <Button
              type="button"
              variant={userType === 'investor' ? 'default' : 'outline'}
              className={cn("flex-1", userType === 'investor' ? 'bg-finance-blue' : '')}
              onClick={() => {
                setUserType('investor');
                form.setValue('userType', 'investor');
              }}
            >
              <User className="mr-2 h-4 w-4" />
              Investor
            </Button>
            <Button
              type="button"
              variant={userType === 'startup' ? 'default' : 'outline'}
              className={cn("flex-1", userType === 'startup' ? 'bg-finance-blue' : '')}
              onClick={() => {
                setUserType('startup');
                form.setValue('userType', 'startup');
              }}
            >
              <Building2 className="mr-2 h-4 w-4" />
              Startup
            </Button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              {userType === 'startup' && (
                <>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Startup Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="fintech">Fintech</SelectItem>
                            <SelectItem value="healthtech">Healthcare/Biotech</SelectItem>
                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                            <SelectItem value="edtech">EdTech</SelectItem>
                            <SelectItem value="saas">SaaS</SelectItem>
                            <SelectItem value="ai">AI/ML</SelectItem>
                            <SelectItem value="hardware">Hardware/IoT</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Funding Stage</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select stage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="idea">Idea/Pre-seed</SelectItem>
                            <SelectItem value="seed">Seed</SelectItem>
                            <SelectItem value="early">Series A</SelectItem>
                            <SelectItem value="growth">Series B/C</SelectItem>
                            <SelectItem value="late">Late Stage</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Startup Description</FormLabel>
                        <FormControl>
                          <textarea
                            className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Briefly describe what your startup does..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This helps us match you with relevant investors.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

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
                    <FormDescription>
                      Must be at least 8 characters with uppercase, lowercase and number.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-finance-blue hover:bg-blue-600">
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/sign-in" className="font-medium text-finance-blue hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-r from-finance-blue to-finance-teal opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1642543492487-6f6ab760f09d?q=80&w=2070&auto=format&fit=crop')", mixBlendMode: "overlay" }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-lg text-white">
            <h2 className="text-3xl sm:text-4xl font-bold">Join the Future of Financial Analytics</h2>
            <p className="mt-4 text-lg text-white/80">
              Leverage AI-powered insights to make better investment decisions in the Indian market.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
