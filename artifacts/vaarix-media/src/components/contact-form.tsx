import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCreateLead } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Loader2 } from "lucide-react";

const servicesOptions = [
  { id: "restaurant_marketing", label: "Restaurant Marketing" },
  { id: "social_media_management", label: "Social Media Management" },
  { id: "content_creation", label: "Content Creation" },
  { id: "instagram_reels", label: "Instagram Reels" },
  { id: "short_form_video_editing", label: "Short-form Video Editing" },
  { id: "branding", label: "Branding" },
  { id: "graphic_design", label: "Graphic Design" },
  { id: "poster_design", label: "Poster Design" },
  { id: "photography", label: "Photography" },
  { id: "videography", label: "Videography" },
  { id: "paid_advertising", label: "Paid Advertising" },
  { id: "website_design", label: "Website Design" },
  { id: "local_business_marketing", label: "Local Business Marketing" },
] as const;

const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  businessName: z.string().min(2, "Business name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  websiteOrInstagram: z.string().optional(),
  monthlyBudget: z.enum(["under_1000", "1000_2500", "2500_5000", "5000_10000", "over_10000"], {
    required_error: "Please select a budget",
  }),
  servicesInterested: z.array(z.string()).min(1, "Select at least one service"),
  message: z.string().min(10, "Please tell us a bit more about your project"),
});

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const createLead = useCreateLead();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      businessName: "",
      phone: "",
      email: "",
      websiteOrInstagram: "",
      servicesInterested: [],
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createLead.mutateAsync({
        data: values as any, // Cast due to strict generated types, validated by zod
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to submit lead", error);
      // Optional: show error toast here, but user asked for inline or just let them retry.
    }
  }

  return (
    <section id="contact" className="py-32 bg-white relative overflow-hidden">
      {/* Decorative blurred blob */}
      <div className="absolute top-0 right-0 -mr-64 -mt-64 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border shadow-xl rounded-[2.5rem] p-8 md:p-14"
              >
                <div className="mb-12">
                  <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">
                    Ready to scale? <br />
                    <span className="italic text-primary">Let's talk.</span>
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Fill out the form below and we'll get back to you within 24 hours to schedule your strategy call.
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold uppercase tracking-wide text-foreground/80">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" className="h-12 bg-background border-border rounded-xl px-4" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold uppercase tracking-wide text-foreground/80">Business Name</FormLabel>
                            <FormControl>
                              <Input placeholder="The Rustic Fork" className="h-12 bg-background border-border rounded-xl px-4" {...field} />
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
                            <FormLabel className="text-sm font-semibold uppercase tracking-wide text-foreground/80">Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" className="h-12 bg-background border-border rounded-xl px-4" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold uppercase tracking-wide text-foreground/80">Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="(555) 123-4567" className="h-12 bg-background border-border rounded-xl px-4" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="websiteOrInstagram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold uppercase tracking-wide text-foreground/80">Website / Instagram (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="@therusticfork" className="h-12 bg-background border-border rounded-xl px-4" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="monthlyBudget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold uppercase tracking-wide text-foreground/80">Monthly Marketing Budget</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 bg-background border-border rounded-xl px-4">
                                  <SelectValue placeholder="Select a budget" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="under_1000">Under $1,000</SelectItem>
                                <SelectItem value="1000_2500">$1,000 - $2,500</SelectItem>
                                <SelectItem value="2500_5000">$2,500 - $5,000</SelectItem>
                                <SelectItem value="5000_10000">$5,000 - $10,000</SelectItem>
                                <SelectItem value="over_10000">Over $10,000</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="servicesInterested"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-sm font-semibold uppercase tracking-wide text-foreground/80">Services Interested In</FormLabel>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {servicesOptions.map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="servicesInterested"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item.id}
                                      className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-border bg-background p-4 shadow-sm hover:border-primary/50 transition-colors cursor-pointer"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, item.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== item.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-medium cursor-pointer text-sm leading-none m-0">
                                        {item.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold uppercase tracking-wide text-foreground/80">Project Details</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your current challenges and goals..." 
                              className="min-h-[120px] bg-background border-border rounded-xl p-4 resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {createLead.isError && (
                      <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20">
                        Something went wrong while submitting. Please try again or email us directly.
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full h-14 rounded-full text-lg font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                      disabled={createLead.isPending}
                    >
                      {createLead.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="bg-primary text-white rounded-[2.5rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[url('@assets/generated_images/hero-bg.jpg')] opacity-20 mix-blend-overlay object-cover" />
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                  >
                    <CheckCircle2 className="w-24 h-24 mb-8 text-white" />
                  </motion.div>
                  <h2 className="font-serif text-4xl md:text-6xl font-medium mb-6">
                    Request Received.
                  </h2>
                  <p className="text-xl text-white/80 max-w-lg mb-12 font-light">
                    Thank you for your interest in Vaarix Media. We're reviewing your details and will be in touch shortly to schedule your strategy call.
                  </p>
                  <Button 
                    variant="outline" 
                    className="bg-transparent border-white/30 text-white hover:bg-white hover:text-primary rounded-full h-12 px-8"
                    onClick={() => setIsSuccess(false)}
                  >
                    Return to site
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
