FROM node:8.9.0@sha256:ae75ba3568f2c3d93b0952bd1a1888434bbd6e2ea8c907aa57836958be688cef

WORKDIR /probot-app-label-docs-pr

COPY package.json yarn.lock /probot-app-label-docs-pr/

RUN yarn
