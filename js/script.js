// 1. 연도 자동 업데이트
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
}

// 2. 모바일 메뉴 기능 (수정됨)
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
// nav-links 안의 모든 a 태그(링크)를 가져옵니다.
const links = document.querySelectorAll('.nav-links a');

// 햄버거 버튼 클릭 시 메뉴 열기/닫기
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // 메뉴판 보이기/숨기기
    hamburger.classList.toggle('active'); // 햄버거 버튼 X자로 변신
});

// 메뉴 안에 있는 링크를 클릭했을 때 메뉴 닫기
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active'); // 메뉴판 숨기기
        hamburger.classList.remove('active'); // 햄버거 버튼 원래대로
    });
});

// 3. 이메일 복사 기능
const copyButton = document.getElementById('copy-button');
const textToCopyElement = document.getElementById('text-to-copy');
const message = document.getElementById('message');

if(copyButton && textToCopyElement) {
    copyButton.addEventListener('click', async (event) => {
        event.preventDefault(); 
        
        const emailText = textToCopyElement.innerText;

        try {
            await navigator.clipboard.writeText(emailText);
            
            message.style.display = 'block'; // 메시지 보이게 설정
            message.style.color = '#00ff88'; 
            message.innerText = '✅ 이메일 주소가 복사되었습니다!';
            
            setTimeout(() => {
                message.innerText = '';
                message.style.display = 'none'; // 메시지 다시 숨김
            }, 2000);

        } catch (err) {
            console.error('클립보드 복사 실패:', err);
            message.style.display = 'block';
            message.style.color = '#ff4444';
            message.innerText = '❌ 복사에 실패했습니다.';
        }
    });
}

/* ... 기존 코드들 아래에 추가 ... */

// 4. 스크롤 애니메이션 (Scroll Reveal)
const observerOptions = {
    root: null, // 뷰포트 기준
    rootMargin: '0px',
    threshold: 0.1 // 요소가 10% 정도 보이면 애니메이션 실행
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // 요소가 화면에 들어오면
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // 클래스 추가 (CSS 애니메이션 발동)
            observer.unobserve(entry.target); // 한 번 실행 후 감시 종료 (성능 최적화)
        }
    });
}, observerOptions);

// 감시할 대상 선택 (.project-card 모두)
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    observer.observe(card);
});

// 5. 스크롤 스파이 (수정됨: Home 인식 개선)
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

function changeNav() {
    let current = '';

    // [핵심 해결책] 스크롤이 최상단 근처(100px 이내)라면 무조건 'home'으로 설정
    if (window.scrollY < 100) {
        current = 'home';
    } else {
        // 그 외의 경우에는 각 섹션의 위치를 계산
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // 네비게이션 바 높이 등을 고려해 여유값(-150px)을 넉넉히 줍니다.
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
    }

    navItems.forEach(a => {
        a.classList.remove('active');
        // href 속성에 current ID가 포함되어 있는지 확인
        if (current && a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
}

// 스크롤 할 때마다 실행
window.addEventListener('scroll', changeNav);

// [추가] 페이지가 로딩되자마자 한 번 실행 (처음부터 색이 들어오게 하기 위함)
window.addEventListener('load', changeNav);

