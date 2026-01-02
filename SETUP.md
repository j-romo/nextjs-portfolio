# Portfolio Setup Guide for Vercel Content Engineer Application

## 🎯 What This Portfolio Demonstrates

This portfolio is specifically tailored to showcase skills relevant to the **Content Engineer** position at Vercel:

1. ✅ **Next.js Expertise** - Built with Next.js 14, App Router, Server Components
2. ✅ **TypeScript Proficiency** - Fully typed codebase with comprehensive interfaces
3. ✅ **Technical Writing** - Extensive JSDoc comments and educational blog post
4. ✅ **API Integration** - GitHub GraphQL API with proper error handling
5. ✅ **Content Strategy** - Clear, concise content targeting technical audiences
6. ✅ **Developer Experience** - Well-documented code that teaches while it demonstrates

## 📋 Setup Checklist

### 1. GitHub Token Setup

```bash
# Create .env.local file
cp .env.example .env.local

# Get your token from: https://github.com/settings/tokens
# Required scope: read:user
# Add to .env.local:
GITHUB_TOKEN=ghp_your_token_here
```

### 2. Update Personal Information

**In `app/page.tsx`:**
- Line ~70: Update GitHub usernames
  ```tsx
  <GitHubContributions 
    username={['your-github', 'work-github']} 
    days={90}
  />
  ```

**In `app/components/footer.tsx`:**
- Update GitHub profile link with your actual username

**In `app/layout.tsx`:**
- Update metadata (already done with "Joaquin Romo")

### 3. Add Your Resume

```bash
# Place your resume PDF in the public directory
cp ~/path/to/your/resume.pdf public/resume.pdf
```

### 4. Test Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### 5. Verify Everything Works

- [ ] Homepage loads correctly
- [ ] Projects section displays all three projects
- [ ] Resume download link works
- [ ] GitHub contributions graph displays (if token configured)
- [ ] Blog posts load
- [ ] Dark mode works
- [ ] Mobile responsive

## 📝 For Your Vercel Application

### Writing Sample to Submit

Use the blog post I created: `app/blog/posts/github-contributions.mdx`

This demonstrates:
- Technical accuracy
- Clear explanations of complex concepts
- Code examples with proper syntax
- Educational value for engineering audiences
- Your voice and style

**To access it:**
1. Start dev server: `npm run dev`
2. Navigate to: http://localhost:3000/blog/github-contributions
3. Or submit the raw file if they prefer markdown

### Alternative Writing Samples

If you have other technical writing samples, great! But this one is ideal because:
- Shows Next.js knowledge (required for the role)
- Demonstrates ability to write about Vercel's core technology
- Educational and accessible
- Production-quality code examples

## 🚀 Deployment to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variable in Vercel Dashboard:
# GITHUB_TOKEN=your_token_here
```

**Important**: After deployment, add `GITHUB_TOKEN` in:
- Vercel Dashboard → Your Project → Settings → Environment Variables

## 💼 Application Tips

### Highlight These Features in Your Application:

1. **GitHub Contributions Feature**
   - "Built a GitHub GraphQL API integration showcasing Server Components"
   - "Demonstrates technical writing through comprehensive code documentation"
   - "Educational implementation that could serve as internal documentation"

2. **Project Documentation**
   - "Created detailed technical documentation in `/docs/GITHUB_CONTRIBUTIONS.md`"
   - "Shows ability to translate technical implementations into clear explanations"

3. **Blog Post**
   - "Wrote educational content explaining Next.js Server Components"
   - "Targets engineering audience (Engineer to CTO level)"
   - "Production-ready code examples with best practices"

### In Your Cover Letter:

> "My portfolio isn't just a showcase—it's documentation. Each feature includes:
> - Comprehensive JSDoc comments explaining the 'why'
> - TypeScript types that serve as inline documentation  
> - Educational blog posts that teach while they demonstrate
> - README files that help others understand and learn
>
> This approach mirrors what I'd bring to Vercel as a Content Engineer: 
> technical accuracy, clear communication, and content that serves developers 
> from engineer to CTO level."

## 📊 What Makes This Portfolio Strong for Content Engineer Role

| Requirement | How This Portfolio Demonstrates It |
|-------------|-------------------------------------|
| 5+ years experience | Resume + project complexity |
| Web development | Next.js, TypeScript, API integration |
| Next.js knowledge | Server Components, ISR, App Router |
| Communication | Clear code docs, blog post, README |
| Fast-paced environment | Complete portfolio update in one session |
| Learning new domains | Multiple tech stacks (Next.js, Astro, Sanity) |

## 🔧 Troubleshooting

**GitHub contributions not showing?**
- Check `.env.local` exists and has valid token
- Verify token has `read:user` scope
- Check browser console for errors

**Resume download not working?**
- Ensure `public/resume.pdf` exists
- File must be named exactly `resume.pdf`

**Build errors?**
- Run `npm install` to ensure dependencies are installed
- Check TypeScript errors: `npx tsc --noEmit`

## 📞 Next Steps

1. ✅ Complete the setup checklist above
2. ✅ Test everything locally
3. ✅ Deploy to Vercel
4. ✅ Update your resume/LinkedIn with portfolio URL
5. ✅ Submit application with blog post as writing sample
6. ✅ In interview, walk through the GitHub contributions implementation

## 🎓 Resources for Interview Prep

- [Vercel's v0.dev](https://v0.dev) - Understand Vercel's AI products
- [Next.js Docs](https://nextjs.org/docs) - Review Server Components deep dive
- [Vercel Blog](https://vercel.com/blog) - Study their content style
- Your own blog post - Be ready to explain the implementation choices

---

**Good luck with your application! 🚀**

This portfolio demonstrates that you don't just write about technology—you build it, document it, and teach others through it.
