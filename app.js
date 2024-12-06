import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import * as feedbacks from "./feedbacks.js";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const app = new Hono();

app.get("/feedbacks/:id", async (c) => {
    const id = c.req.param("id");
    const feedbackcount = await feedbacks.getCount(id);
    return c.text(`Feedback ${id}: ${feedbackcount}`);
});
app.post("/feedbacks/:id", async (c) => {
    const id = c.req.param("id");
    await feedbacks.incrementCount(id);
    return c.redirect("/");
});

app.get("/", async (c) => {
    return c.html(eta.render("index.eta"));
});

export default app;

// deno run --allow-net --unstable-kv --allow-read --watch app-run.js