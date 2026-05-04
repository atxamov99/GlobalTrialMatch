# Backend — Vazifalar

## Infra sozlash
- [ ] Neon da `globaltrialmatch` database yaratish
- [ ] `.env` ga to'g'ri DATABASE_URL qo'yish
- [ ] Anthropic API key olish va `.env` ga qo'yish

## Loyihani TypeScript ga ko'chirish
- [ ] `package.json` yangilash (Fastify, Drizzle, Zod, tsx)
- [ ] `tsconfig.json` yaratish
- [ ] `drizzle.config.ts` yaratish
- [ ] `src/server.ts` — Fastify server
- [ ] `src/app.ts` — pluginlar registratsiyasi

## Database schema
- [ ] `src/db/index.ts` — Drizzle + Pool
- [ ] `src/db/schema/users.ts`
- [ ] `src/db/schema/patients.ts`
- [ ] `src/db/schema/applications.ts`
- [ ] `src/db/schema/saved-trials.ts`
- [ ] `src/db/schema/refresh-tokens.ts`
- [ ] `npx drizzle-kit push` — DB ga yuborish

## Pluginlar
- [ ] `src/plugins/db.ts`
- [ ] `src/plugins/jwt.ts`
- [ ] `src/plugins/redis.ts`
- [ ] `src/plugins/cors.ts`

## Auth moduli
- [ ] `src/modules/auth/auth.schema.ts` (Zod)
- [ ] `src/modules/auth/auth.service.ts` (bcrypt, JWT)
- [ ] `src/modules/auth/auth.routes.ts`
- [ ] Register endpoint test (Postman/curl)
- [ ] Login + refresh token test

## Trials moduli
- [ ] `src/utils/clinical-trials.ts` — API wrapper
- [ ] `src/modules/trials/trials.service.ts`
- [ ] `src/modules/trials/trials.routes.ts`
- [ ] Search endpoint test

## AI Match moduli
- [ ] `src/utils/ai-match.ts` — Claude API
- [ ] `src/modules/match/match.service.ts`
- [ ] `src/modules/match/match.routes.ts`
- [ ] Match endpoint test (real diagnoz bilan)

## Profile moduli
- [ ] `src/modules/profile/profile.service.ts`
- [ ] `src/modules/profile/profile.routes.ts`

## Applications moduli
- [ ] `src/modules/applications/applications.service.ts`
- [ ] `src/modules/applications/applications.routes.ts`

## Saved moduli
- [ ] `src/modules/saved/saved.service.ts`
- [ ] `src/modules/saved/saved.routes.ts`

## Admin moduli
- [ ] Admin middleware (role=admin tekshirish)
- [ ] Admin routes (users, applications, stats)

## Deploy
- [ ] Render.com da web service yaratish
- [ ] Env vars ni Render ga kiritish
- [ ] `npm run build` ishlashini tekshirish
- [ ] Production URL ni frontend `.env` ga qo'yish
