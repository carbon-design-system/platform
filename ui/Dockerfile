FROM carbon/platform-build as builder
FROM node:10.16.0-alpine

ENV HOST 0.0.0.0
ENV PORT 3000
ENV NODE_ENV production
ENV PROTOCOL http
ENV SHOULD_REDIRECT_HTTPS true

WORKDIR /usr/src/service

COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/packages ./packages
COPY --from=builder /workspace/ui ./ui
COPY --from=builder /workspace/ui/node_modules ./ui/node_modules

WORKDIR /usr/src/service/ui

CMD ["yarn", "start"]
