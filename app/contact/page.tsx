import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-2xl mx-auto">
      
      {/* Header Section */}
      <div className="mb-12">
        <Link 
          href="/" 
          className="text-muted-foreground hover:text-foreground text-sm mb-6 inline-block transition-colors"
        >
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Let's Talk.</h1>
        <p className="text-muted-foreground text-lg">
          Interested in a collaboration or just want to say hi? 
          Drop me a message below.
        </p>
      </div>

      {/* The Form Card */}
      <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
        
        {/* NOTE: We will connect this to Formspree later so it actually emails you.
           For now, the UI is ready.
        */}
        <form className="flex flex-col gap-6">
          
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                placeholder="John Doe"
                className="bg-background border border-input rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                placeholder="john@example.com"
                className="bg-background border border-input rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="text-sm font-medium">Subject</label>
             <select 
                id="subject"
                name="subject"
                className="bg-background border border-input rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option>General Inquiry</option>
                <option>Freelance Project</option>
                <option>Consulting</option>
              </select>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <textarea 
              id="message"
              name="message"
              rows={5}
              placeholder="Tell me about your project..."
              className="bg-background border border-input rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="bg-foreground text-background font-bold py-3 px-6 rounded-md hover:opacity-90 transition-opacity mt-2"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}