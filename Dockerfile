FROM node:8.11.1@sha256:89171382ea2e08a7ca84f653cd37e30e47b9c305baaee272899e25c912172f26

WORKDIR /probot-app-label-docs-pr

COPY package.json yarn.lock /probot-app-label-docs-pr/

RUN yarn
