## Inquiries: End‑to‑End Implementation Plan (Sent/Received)

### Goal

Deliver a correct, persistent inquiries feature where:

- When I send an inquiry on someone else’s property, it appears in my list as “sent”.
- When someone sends an inquiry about my property, it appears for me as “received”.
- Data is isolated per user, consistent after reload, and available without admin rights.

---

### Backend (minimal, safe additions)

1. Controller: `InquiryController`

   - Add endpoint: `GET /api/Inquiry/my` with `[Authorize]` (no admin policy).
   - Read `currentUserId` from JWT.
   - Return DTO: `{ sent: InquiryDto[]; received: InquiryDto[] }`, where:
     - `sent`: inquiries where `Inquiry.UserId == currentUserId`.
     - `received`: inquiries where `Inquiry.Property.UserId == currentUserId`.

2. Manager/Service layer (BLL)

   - Add method: `GetMyInquiriesAsync(Guid currentUserId)` that returns the two lists above.
   - Optimize with DB indexes on `(UserId)` and `(PropertyId)`.

3. Security/Permissions

   - Keep existing admin endpoints (e.g., `/Inquiry`, `/by-user/{id}`, `/by-property/{id}`) with admin policy unchanged.
   - `POST /api/Inquiry` remains `[Authorize]`; server sets `UserId = currentUserId` (ignore client userId) and validates `PropertyId`.

4. DTOs/Shape

   - `InquiryDto`: `{ id, propertyId, userId, message, createdAt, name?, email?, phone?, propertyTitle?, userName? }`.
   - `MyInquiriesResponseDto`: `{ sent: InquiryDto[]; received: InquiryDto[] }`.

5. Documentation
   - Update `API_DOCUMENTATION.md` to add `/Inquiry/my` with examples and response schema.

---

### Frontend

1. Endpoints

   - `src/utils/constants.ts`: add `API_ENDPOINTS.INQUIRY.MY = "/Inquiry/my"` (do not remove existing constants for compatibility).

2. Service

   - `src/services/inquiryService.ts`:
     - Add `getMyInquiries(): Promise<{ sent: Inquiry[]; received: Inquiry[] }>` calling `API_ENDPOINTS.INQUIRY.MY`.
     - Keep `getUserInquiries()` for legacy; UI should switch to `getMyInquiries()`.

3. Caching (per user)

   - `src/config/queryClient.ts`: add query key factory `queryKeys.inquiries.my = (userId) => ["inquiries","my", userId]`.
   - Use this key across reads/updates; remove stale user data on logout if needed.

4. UI: Inquiries page

   - `src/pages/InquiriesPage.tsx`:
     - Replace `getUserInquiries()` with `getMyInquiries()` using key `["inquiries","my", user?.id]`.
     - Render two sections (or tabs):
       - “Sent” → data.sent (tag `t("inquiries.sent")`).
       - “Received” → data.received (tag `t("inquiries.received")`).
     - For received rows, show link to the property (use `propertyId` / `propertyTitle`).

5. InquiryForm (create flow)

   - `src/components/inquiry/InquiryForm.tsx`:
     - On success:
       - Optimistically add the new inquiry to `sent` in cache `["inquiries","my", user?.id]`.
       - Also `invalidateQueries({ queryKey: ["inquiries","my"] })` to sync when server responds.

6. Translations

   - `src/contexts/translations.ts`: ensure existence of keys `inquiries.sent`, `inquiries.received` (EN/UK).

7. Profile/Other pages
   - If any counts/indicators rely on inquiries, compute from `getMyInquiries()` (sum of `sent.length + received.length`).

---

### Validation/UX Notes

- Authenticated users: only `message` is required; backend sets `userId` from token.
- Anonymous support (optional): allow `name/email/phone` in request; backend maps them to inquiry record safely.
- Show toasts on success/failure; keep localizable.
- Network errors: graceful fallback messages already exist.

---

### Testing Checklist

1. As User A, create inquiry on a property owned by User B → A’s “Sent” shows it.
2. Login as User B → “Received” shows it with link to property.
3. Refresh both pages → persistence verified (data from server).
4. Logout/Login switch → no data leakage between accounts.
5. Admin view still works for `/Inquiry` (unchanged).

---

### Rollout & Risk

- Backend addition is backward compatible: new endpoint only.
- Frontend switches to `/Inquiry/my`. If backend isn’t deployed yet, keep legacy UI fallback or feature flag.
- Risk: none for existing flows; ensure auth middleware exposes `NameIdentifier` claim.

---

### Optional Enhancements

- Pagination on `/Inquiry/my` if lists can be large.
- Server‑side projection to include `propertyTitle`/`userName` to avoid extra client queries.
