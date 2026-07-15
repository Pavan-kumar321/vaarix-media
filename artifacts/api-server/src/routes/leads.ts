import { Router, type IRouter } from "express";
import { db, leadsTable } from "@workspace/db";
import { CreateLeadBody, CreateLeadResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/leads", async (req, res): Promise<void> => {
  const parsed = CreateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid lead payload");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [lead] = await db
    .insert(leadsTable)
    .values({
      fullName: parsed.data.fullName,
      businessName: parsed.data.businessName,
      phone: parsed.data.phone,
      email: parsed.data.email,
      websiteOrInstagram: parsed.data.websiteOrInstagram ?? null,
      monthlyBudget: parsed.data.monthlyBudget,
      servicesInterested: parsed.data.servicesInterested,
      message: parsed.data.message,
    })
    .returning();

  req.log.info({ leadId: lead.id }, "Lead captured");
  res.status(201).json(CreateLeadResponse.parse(lead));
});

export default router;
