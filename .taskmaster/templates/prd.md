# 제품 요구 사항 문서 (PRD)

## 1. Executive Summary
본 서비스는 URL과 시나리오만 입력하면 브라우저 기반 E2E 테스트를 자동 수행·관리해 주는 웹 플랫폼이다. 복잡한 환경 설정 없이 QA 엔지니어뿐 아니라 QA가 없는 조직의 PM·PO·디자이너·1인 개발자도 쉽게 테스트를 실행·시각화할 수 있다. 자동 Test Case(TC) 생성, 스냅샷 저장, 결과 대시보드 제공으로 개발 품질과 릴리즈 속도를 동시에 개선한다.

## 2. Problem Statement
- 기존 E2E 테스트 도구는 로컬 설정, 코드 작성, CI 통합 등 초기 진입 장벽이 높다.  
- QA 리소스가 부족한 조직은 수동 테스트나 미흡한 검증으로 품질·신뢰도 저하를 겪는다.  
- 테스트 기록과 스냅샷이 체계적으로 관리되지 않아 회귀 테스트와 이슈 재현이 어렵다.

## 3. Goals and Objectives
- Primary Goal: 시나리오 기반 브라우저 자동 테스트를 “URL + 시나리오 입력”만으로 제공  
- Secondary Goals  
  - 테스트 생성·실행·결과 모니터링을 UI로 간소화  
  - 결과 데이터·스냅샷을 버전별로 저장하여 추적성 확보  
  - 실시간 진행 상태 스트리밍으로 사용자 대기 시간 최소화  
- Success Metrics  
  - 월간 활성 테스트 프로젝트 ≥ 200  
  - 테스트 성공률(Flaky 제외) ≥ 95%  
  - 평균 테스트 설정 시간 ≤ 3분  
  - 사용자 NPS ≥ 40

## 4. Target Audience
### Primary Users
- QA 엔지니어: 반복 회귀 테스트 자동화
- QA 부재 조직의 PO/PM/디자이너: 릴리즈 전 간단 검증
- 1인 개발자·바이브 코더: 배포 전 품질 체크
### Secondary Users
- 경영진·스테이크홀더: 품질 지표 확인
- DevOps 팀: 테스트 결과 CI 파이프라인 연동

## 5. User Stories
- QA로서, URL과 시나리오를 입력해 자동 TC를 생성하고 싶다.  
- PM으로서, 테스트 진행 상황을 실시간으로 보고 릴리즈 일정을 조정하고 싶다.  
- 디자이너로서, UI 변경 후 시각적 회귀 스냅샷을 확인해 디자인 일관성을 보장하고 싶다.  
- 1인 개발자로서, 로컬 환경 설정 없이 테스트를 실행해 배포 리스크를 줄이고 싶다.

## 6. Functional Requirements
### Core Features
1. 시나리오 입력 UI  
   - Gherkin-like 에디터 & 템플릿  
   - Acceptance: 시나리오 저장 후 “생성 완료” 토스트 알림

2. 자동 TC 생성 엔진  
   - Playwright-MCP로 테스트 코드 실시간 변환  
   - Acceptance: 변환 실패 시 오류 로그 & 재시도 옵션

3. 테스트 실행 및 모니터링  
   - 실행 큐·병렬 처리, 진행률(%) 스트리밍 via WebSocket  
   - Acceptance: 진행률 오차 ≤ 5%, 취소 버튼 즉시 반영

4. 결과 저장 & 대시보드  
   - 각 Step별 성공/실패, 스냅샷, 콘솔 로그 저장(Supabase)  
   - Acceptance: 30일 후 자동 보관 정책, 검색·필터 가능

### Supporting Features
- 멀티 브라우저 선택(Chrome, Firefox, WebKit)  
- 테스트 히스토리 비교(diff)  
- 팀 권한(Owner, Editor, Viewer)  
- CI Webhook 트리거 & 결과 API

## 7. Non-Functional Requirements
- Performance: 1,000 동시 테스트 시 응답 지연 ≤ 2s  
- Security: OAuth2, Row Level Security in Supabase, TLS 1.2+  
- Usability: 온보딩 ≤ 5 min, WCAG 2.1 AA  
- Scalability: Dockerized worker 오토스케일, Region replication  
- Compatibility: 최신 2개 버전의 주요 브라우저

## 8. Technical Considerations
- Architecture: React SPA → Hono(edge) API → Node worker(Docker) running Playwright-MCP  
- Data: Supabase Postgres for metadata, S3-compatible for 스냅샷  
- Integrations: GitHub, GitLab, Slack, Jira Webhooks  
- Third-party: Playwright, MCP, Supabase Auth/Storage  
- Deployment: Edge Functions(Hono) + Kubernetes worker pool

## 9. Success Metrics and KPIs
- DAU / MAU, 퍼널(시나리오 작성→테스트 실행) 전환율  
- 평균 테스트 실행 시간, Flaky rate  
- 스냅샷 보존 비용 대비 API 호출 수  
- Revenue: Pro 구독 전환율, ARPU

## 10. Timeline and Milestones
| Phase | 기간 | 주요 산출물 |
|-------|------|-------------|
| 1. Discovery | M0-M1 | UX 리서치, 상세 시나리오 정의 |
| 2. MVP | M2-M3 | Core Features 1~3, Chrome 지원, CI Webhook |
| 3. Beta | M4 | Firefox/WebKit, 실시간 스트리밍, 팀 권한 |
| 4. GA | M5 | 스냅샷 diff, Billing, SLA 99.5% |
| 5. Expansion | M6+ | AI 시나리오 추천, 퍼포먼스 테스트 모듈 |

## 11. Risks and Mitigation
- Test Flakiness → Network mock, 리트라이 전략, 결과 히트맵 제공  
- Browser 업데이트 호환성 → 주간 회귀 빌드, Canary 모니터링  
- 데이터 저장 비용 증가 → 스냅샷 압축·수명주기 정책  
- 사용자 개인정보 노출 → 필터링 규칙, 접근 로그 암호화

## 12. Future Considerations
- AI Prompt 기반 시나리오 자동 작성  
- 모바일 앱 테스트(iOS, Android) 확대  
- 퍼포먼스·부하 테스트 통합  
- 마켓플레이스(커뮤니티 시나리오, 플러그인) 구축