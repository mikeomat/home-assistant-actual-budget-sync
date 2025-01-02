ARG BUILD_FROM=ghcr.io/hassio-addons/base-nodejs:0.2.5
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

COPY ./actual-budget-sync/src ./src
COPY ./actual-budget-sync/tsconfig.json ./
COPY ./actual-budget-sync/package.json ./

RUN apk add nodejs

# # Command to run the application
CMD ["node", "dist/main.js"]