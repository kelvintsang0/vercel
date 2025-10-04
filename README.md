# Kelvin Site — One-Page (Next.js + Tailwind)

This folder is ready to deploy on **Vercel**.

## Easiest deploy (no coding)
1. Go to https://vercel.com/new
2. Click **Import** → **...** → **Upload** (drag this entire folder), or push this folder to GitHub and choose the repo.
3. Vercel will auto-detect **Next.js**. Click **Deploy**.
4. After deploy finishes, click **Visit** to see your live site.
5. To use your **own domain**, open the project → **Settings** → **Domains** → add your domain and follow the prompt.

## Make the contact form send without opening email
- By default, the form opens the visitor's email app (mailto).
- To send directly from the page, you can use a service like **Formspree**:

Steps:
1) Create a Formspree form, copy its endpoint URL (looks like https://formspree.io/f/xxxxxx).
2) In Vercel → Project → **Settings** → **Environment Variables**, add:
   - `NEXT_PUBLIC_CONTACT_ENDPOINT` = `/api/contact`
   - `FORMSPREE_ENDPOINT` = `<your formspree url>`
3) Redeploy. Now the form submits to the API route which forwards to Formspree.

That's it.