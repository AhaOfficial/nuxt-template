FROM node:lts
# Project directory
WORKDIR /usr/home/aha
# Install dependencies
COPY package*.json ./
RUN npm install
# Set environment variables
# ENV NODE_ENV production
# ENV HOST 0.0.0.0
# ENV API_URL https://api.a-ha.io
# ENV ATTEND_STAMP_EVENT _X10
# ENV FACEBOOK_APP_ID 800157016982211
# ENV GOOGLE_TAG_MANAGER_ID GTM-PLKF6PJ
# ENV KAKAO_API_KEY 34dac78171b54633121b15d015efa895
# ENV NAVER_CLIENT_ID lTyIlepDELk5xk8dWle2
# ENV SESSION_LIFETIME 3
# ENV STATIC_URL https://static.a-ha.io
# ENV WEB_URL https://www.a-ha.io
# Copy sources and expose a port
COPY . .
EXPOSE 80
# Build
RUN npm run build:modern
CMD [ "npm", "run", "start:modern" ]