const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Only POST allowed." }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    try {
      const body = await request.json();

      if (!body?.prompt) {
        return new Response(JSON.stringify({ error: "Missing prompt." }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      const apiResponse = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-images-1.5",
            prompt: body.prompt,
            size: "1024x1024",
          }),
        }
      );

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        return new Response(JSON.stringify({ error: errorText }), {
          status: apiResponse.status,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      const apiData = await apiResponse.json();
      const imageUrl = apiData?.data?.[0]?.url;

      if (!imageUrl) {
        return new Response(
          JSON.stringify({ error: "No image URL returned by API." }),
          {
            status: 502,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      return new Response(JSON.stringify({ image: imageUrl }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Invalid request." }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  },
};
