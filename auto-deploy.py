from playwright.sync_api import sync_playwright
from dotenv import load_dotenv
import os
import time
import functools

print = functools.partial(print, flush=True)

load_dotenv()

URL = os.getenv("AUTO_DEPLOY_URL")
GITHUB_ID = os.getenv("AUTO_DEPLOY_GITHUB_ID")
GITHUB_PW = os.getenv("AUTO_DEPLOY_GITHUB_PW")

with sync_playwright() as p:
    print("[1] Playwright 실행 시작")
    browser = p.chromium.launch(headless=True)

    context = browser.new_context(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        viewport={"width": 1280, "height": 800},
        locale="ko-KR",
    )

    context.add_init_script("""
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    window.navigator.chrome = { runtime: {} };
    Object.defineProperty(navigator, 'languages', { get: () => ['ko-KR', 'ko'] });
    Object.defineProperty(navigator, 'language', { get: () => 'ko-KR' });
    Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
    """)
    print("[2] 브라우저 context 설정 완료")

    page = context.new_page()

    try:
        page.goto("https://app.cloudtype.io/@jungahyeon0512/renglishdb:main")
        print("[3] Cloudtype 앱 페이지 진입 성공")
    except Exception as e:
        print(f"[3] 페이지 진입 실패: {e}")

    try:
        with context.expect_page() as github:
            page.click("a:has-text('GitHub 계정으로 로그인')")
        github_page = github.value
        print("[4] GitHub 로그인 페이지 열기 성공")
    except Exception as e:
        print(f"[4] GitHub 로그인 페이지 열기 실패: {e}")

    try:
        github_page.wait_for_selector("input[name='login']")
        github_page.fill("input[name='login']", GITHUB_ID)
        github_page.fill("input[name='password']", GITHUB_PW)
        github_page.click("input[name='commit']")
        print("[5] GitHub 로그인 정보 입력 및 전송 성공")
    except Exception as e:
        print(f"[5] GitHub 로그인 실패: {e}")

    try:
        h3 = github_page.query_selector("h3[data-target='sudo-credential-options.githubMobileChallengeValue']")
        if h3:
            value = h3.inner_text().strip()
            print(f"[Github OTP 값]: {value}")
        else:
            print("[Github OTP 값]: 해당 요소를 찾을 수 없습니다.")
    except Exception as e:
        print(f"[Github OTP 값 추출 실패]: {e}")

    try:
        time.sleep(30)
        page.goto("https://app.cloudtype.io/@jungahyeon0512/renglishdb:main")
        page.wait_for_load_state("networkidle")
        print("[6] 로그인 후 Cloudtype 앱 페이지 재진입 성공")
    except Exception as e:
        print(f"[6] 재진입 실패: {e}")

    try:
        divs = page.query_selector_all("div.x-card.select-none")
        print(f"[7] 서비스 카드 {len(divs)}개 탐색됨")

        for i, div in enumerate(divs):
            a_tags = div.query_selector_all("a")

            if len(a_tags) >= 2:
                try:
                    a_tags[0].click()
                    print(f"[8-{i}] 배포 클릭 성공")
                    page.wait_for_timeout(1000)
                except Exception as e:
                    print(f"[8-{i}] 배포 클릭 실패: {e}")
            else:
                print(f"[8-{i}] a 태그 부족 (2개 미만)")
    except Exception as e:
        print(f"[7] 요소 탐색 실패: {e}")

    browser.close()
    print("[9] 브라우저 종료 완료")
