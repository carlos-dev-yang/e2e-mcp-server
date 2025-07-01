# Playwright 및 Node.js 환경을 포함하는 공식 Playwright 이미지 사용
FROM mcr.microsoft.com/playwright/node:lts-jammy

# 컨테이너 내 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json 및 package-lock.json 복사
COPY package*.json ./

# 의존성 설치 (playwright-mcp 포함)
RUN npm install

# 애플리케이션 소스 코드 번들 (필요한 경우, 현재는 Playwright-MCP 서버만 실행)
# COPY . .

# Playwright-MCP 서버가 사용할 포트 노출 (기본 8080)
EXPOSE 8080

# 컨테이너 시작 시 Playwright-MCP 서버 실행
CMD ["npx", "playwright-mcp", "server"]