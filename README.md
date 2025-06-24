![auth](./public/auth.png)

a clean, straightforwrad template auth template with next.js and supabase 

with preconfigured email/passowrd sign-up / sign-in. 

### installation

1.  clone the repo
    ```sh
    git clone https://github.com/your_username/your_repository.git
    ```
2.  install NPM packages
    ```sh
    npm install
    ```
3.  Set up your environment variables. Rename `.env.  example` to `.env.local` and add your Supabase project URL and anon key. You can find these in your Supabase project's API settings.

    ```env
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

4.  Run the development server
    ```sh
    npm run dev
    ```

this auth template should now work