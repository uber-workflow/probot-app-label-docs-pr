FROM node:8.9.4@sha256:068a0746d03a072cddbe8c49082bcf80ede9d5f57839ad775df85d07228b2e6d

WORKDIR /probot-app-label-docs-pr

COPY package.json yarn.lock /probot-app-label-docs-pr/

RUN yarn
