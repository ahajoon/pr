# 든든한웹전문가 형준 — 포트폴리오

순수 HTML · CSS · 바닐라 JS로 만든 정적 사이트입니다. 빌드 과정이 없어서 파일을 그대로 올리면 됩니다.

## 폴더 구조

```
index.html          메인 원페이지 (소개 · 프로젝트 · 홈페이지 · 프로필 · 기술 · 경력 · 연락처)
projects/*.html     프로젝트·홈페이지 상세 13개
css/style.css       공통 스타일 (모바일 < 768px ≤ 태블릿 < 1024px ≤ PC)
js/main.js          메뉴 · 슬라이드 · 프로젝트 선택 · PC/태블릿/모바일 미리보기 전환
images/             웹용 WebP 이미지
.nojekyll           GitHub Pages가 파일을 그대로 쓰도록 하는 빈 파일
```

## GitHub Pages 배포

1. GitHub에서 새 저장소를 만듭니다. (예: `portfolio`, Public)
2. 이 폴더 안의 파일을 모두 저장소 맨 위에 올립니다. (`index.html`이 저장소 첫 화면에 보여야 합니다)
3. **Settings → Pages → Build and deployment**에서 Source를 **Deploy from a branch**, Branch를 **main / (root)** 로 두고 Save.
4. 1~2분 뒤 `https://아이디.github.io/portfolio/` 에서 열립니다.

## 닷홈 등 일반 호스팅

FTP로 접속해 웹 루트(`html` 폴더)에 이 폴더 안의 파일을 그대로 올리면 됩니다.

## 내용 고치기

- 문구: `index.html`, `projects/*.html`을 직접 수정합니다.
- 이미지 교체: `images/` 안의 같은 이름 파일을 바꿔 넣습니다. (가로 1200px 이하 WebP 권장)
