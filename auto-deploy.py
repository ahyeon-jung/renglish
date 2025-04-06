from playwright.sync_api import sync_playwright
from dotenv import load_dotenv
import os
import time

load_dotenv()

URL = os.getenv("AUTO_DEPLOY_URL")
GITHUB_ID = os.getenv("AUTO_DEPLOY_GITHUB_ID")
GITHUB_PW = os.getenv("AUTO_DEPLOY_GITHUB_PW")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    
    # 1. cloudType 우회 설정
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

    page = context.new_page()

    # 2. 페이지 진입
    page.goto("https://app.cloudtype.io/@jungahyeon0512/renglishdb:main")

    # 3. 깃허브 로그인 버튼 클릭
    with context.expect_page() as github:
        page.click("a:has-text('GitHub 계정으로 로그인')")

    github_page = github.value

    # 4. 로그인 정보 채우기
    github_page.wait_for_selector("input[name='login']")
    github_page.fill("input[name='login']", GITHUB_ID)
    github_page.fill("input[name='password']", GITHUB_PW)
    github_page.click("input[name='commit']")

    page.wait_for_load_state("networkidle")

    # 4-1. cloudType 권한 허용(종종 권한 허용 페이지로 이동함)
    time.sleep(3)

    # 5. 다시 앱 페이지로 진입(바로 진입 안됨)
    page.goto("https://app.cloudtype.io/@jungahyeon0512/renglishdb:main")
    page.wait_for_load_state("networkidle")

    # 6. HTML 및 요소 출력
    html = page.content()
    divs = page.query_selector_all("div.x-card.select-none")

    # DIVS = DB(0), SERVER(1)
    # A_TAGS = 배포(0), 중지(1)
    for i, div in enumerate(divs):
      a_tags = div.query_selector_all("a")

      if len(a_tags) >= 2:
          try:
              a_tags[0].click()
              print(f"배포 완료")
              page.wait_for_timeout(1000)
          except Exception as e:
              print(f"배포 클릭 실패")
      else:
          print(f"배포 클릭 실패")

    browser.close()
