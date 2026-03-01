# Google Form Fields

Create these exact question names in Google Forms.  
This matches `tools/form_to_brief.py`.

## Required Fields

1. `clientId` (Short answer)  
   Example: `pulsedesk`
2. `brandName` (Short answer)  
   Example: `PulseDesk`
3. `tagline` (Short answer)  
   Example: `Work clearer. Deliver faster.`
4. `audience` (Paragraph)  
   Example: `Freelancers and small product teams...`
5. `primaryColor` (Short answer)  
   Example: `#1D4ED8`
6. `accentColor` (Short answer)  
   Example: `#F59E0B`
7. `tone` (Paragraph)  
   Example: `Confident, clean, and helpful.`
8. `sections` (Paragraph)  
   Comma-separated section IDs.  
   Example: `hero,features,testimonials,faq,cta,footer`
9. `features` (Paragraph)  
   JSON array of objects with `title` and `description`.  
   Example: `[{"title":"Project Hub","description":"..."}]`
10. `testimonials` (Paragraph)  
    JSON array of objects with `quote`, `name`, and `role`.  
    Example: `[{"quote":"...","name":"...","role":"..."}]`
11. `faq` (Paragraph)  
    JSON array of objects with `question` and `answer`.  
    Example: `[{"question":"...","answer":"..."}]`
12. `primaryCta` (Short answer)  
    Example: `Start Free Trial`
13. `secondaryCta` (Short answer)  
    Example: `Book a Demo`

## Export Format

The converter accepts:
- a single JSON object with keys above
- or an array of responses (it uses the first item)
- or an object containing `responses`/`items`/`entries` array (it uses the first item)
