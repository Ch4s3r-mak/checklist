// 1. 플러그인 등록
Chart.register(ChartDataLabels);

// 2. 막대 그래프 (주로 섭취하는 카페인 종류)
const ctx1 = document.getElementById('typeChart').getContext('2d');
new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['에너지 드링크', '커피류(커피우유 포함)', '기타'],
        datasets: [{
            label: '선호하는 카페인 종류',
            data: [24, 41, 3],
            backgroundColor: '#ffa856',
            borderColor: '#FF9F43',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: { display: true, text: '주로 섭취하는 카페인 종류' },
            datalabels: { display: false } 
        },
        // 👇 Y축 단위를 5단위로 고정하는 설정 추가
        scales: {
            y: {
                beginAtZero: true, // 0부터 시작
                ticks: {
                    stepSize: 5 // 💡 눈금 간격을 5단위로 설정
                }
            }
        }
    }
});

const ctx2 = document.getElementById('sleepChart').getContext('2d');
new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: ['1~2시간', '3~4시간', '5~6시간', '7~8시간' , '9시간 이상'],
        datasets: [{
            data: [5, 20, 29, 10, 4], 
            backgroundColor: ['#FF6384', '#36A2EB', '#67ff67' ,'#fdf14d', '#8919f1']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: { display: true, text: '카페인 섭취자의 평균 수면 시간 비율' },
            datalabels: {
                display: true, // 수치 표시 활성화
                color: '#fff', 
                formatter: (value, ctx) => {
                    // 전체 합계를 구해서 퍼센트로 계산
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map(data => { sum += data; });
                    let percentage = (value * 100 / sum).toFixed(1) + "%";
                    return percentage; // 단순 수치를 원하면 'return value;'로 변경
                },
                font: {
                    weight: 'bold',
                    size: 14
                }
            }
        }
    }
});

// 4. 카페인 자가진단 결과 계산 함수
function checkCaffeineLevel() {
    // 체크된 체크박스의 개수를 셉니다.
    const checkboxes = document.querySelectorAll('.caffeine-check:checked');
    const score = checkboxes.length;
    
    const resultDiv = document.getElementById('quizResult');
    resultDiv.style.display = 'block'; // 결과창 보여주기
    
    // 점수별 결과 메시지 설정 (2개 이하 / 4개 이하 / 6개 이하)
    if (score === 0) {
        resultDiv.style.backgroundColor = '#d4edda';
        resultDiv.style.color = '#155724';
        resultDiv.innerHTML = `
            <div style="font-size: 18px; margin-bottom: 8px;">✅ 결과: 안전 (체크 개수: ${score}개)</div>
            <div style="font-size: 14px; font-weight: normal; line-height: 1.5;">
                카페인으로부터 안전한 습관을 유지하고 있습니다. 지금처럼 건강한 생활을 유지해 주세요!
            </div>
        `;
    } else if (score <= 2) {
        resultDiv.style.backgroundColor = '#fff3cd';
        resultDiv.style.color = '#856404';
        resultDiv.innerHTML = `
            <div style="font-size: 18px; margin-bottom: 8px;">⚠️ 결과: 주의 단계 (체크 개수: ${score}개)</div>
            <div style="font-size: 14px; font-weight: normal; line-height: 1.5;">
                카페인 의존도가 생기기 시작하는 단계입니다. 습관적으로 에너지 드링크나 커피를 찾는 행동을 조금씩 줄여보세요.
            </div>
        `;
    } else if (score <= 4) {
        resultDiv.style.backgroundColor = '#f8d7da';
        resultDiv.style.color = '#721c24';
        resultDiv.innerHTML = `
            <div style="font-size: 18px; margin-bottom: 8px;">🚨 결과: 카페인 중독 경고! (체크 개수: ${score}개)</div>
            <div style="font-size: 14px; font-weight: normal; line-height: 1.5;">
                이미 일상생활에서 카페인 부작용(피로, 두통 등)을 겪고 계실 가능성이 큽니다. 의도적으로 하루 섭취량을 동생들과 친구들에게 알리고 줄여나가야 합니다.
            </div>
        `;
    } else { // 5~6개 체크한 경우
        resultDiv.style.backgroundColor = '#721c24';
        resultDiv.style.color = '#ffffff';
        resultDiv.innerHTML = `
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">💥 결과: 심각한 카페인 중독 상태 (체크 개수: ${score}개)</div>
            <div style="font-size: 14px; font-weight: normal; line-height: 1.5;">
                카페인에 대한 심한 중독과 신체적 부작용이 동반된 상태입니다. 스스로 조절하기 어려울 수 있으니 당장 카페인 음료를 끊고 탄산수나 물로 대체해야 합니다.
            </div>
        `;
    }

    // [요청하신 추가 경고 문구] 모든 결과의 하단에 공통으로 표시됩니다.
    resultDiv.innerHTML += `
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px dashed rgba(0,0,0,0.2); font-size: 13px; font-weight: normal; line-height: 1.6; text-align: left; color: ${score > 4 ? '#ffcccc' : '#555'};">
            ℹ️ <strong>꼭 알아두십시오!</strong><br>
            성장기 청소년에서 카페인 과다로 인한 부작용이 특히 많습니다. 만약 심장질환이나 정신질환이 있는 경우 부작용 가능성이 훨씬 높아지고 카페인 중독뿐 아니라 다른 약물 중독, 사고사 등의 확률을 높입니다.
        </div>
    `;
    
    // 결과 확인 후 화면을 결과창 위치로 부드럽게 스크롤해주는 기능
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}
