import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const email = "jimmydarkey@gmail.com";
    const password = "@gotechsquad#";

    // Check if user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existing = existingUsers?.users?.find((u: any) => u.email === email);

    if (existing) {
      // Update the password
      await supabaseAdmin.auth.admin.updateUserById(existing.id, { password });

      // Ensure admin role exists
      const { data: roleCheck } = await supabaseAdmin
        .from("user_roles")
        .select("id")
        .eq("user_id", existing.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleCheck) {
        await supabaseAdmin.from("user_roles").insert({ user_id: existing.id, role: "admin" });
      }

      return new Response(JSON.stringify({ message: "Admin password updated and role ensured" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create user
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: "Admin" },
    });

    if (createError) throw createError;

    // Set admin role
    await supabaseAdmin.from("user_roles").insert({ user_id: newUser.user.id, role: "admin" });

    return new Response(JSON.stringify({ message: "Admin created successfully" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
