document.getElementById('calcBtn').addEventListener('click', function() {
    const weight = parseFloat(document.getElementById('weight').value);
    const caffeinePerMl = parseFloat(document.getElementById('drinkSelect').value);
    const amount = parseFloat(document.getElementById('amount').value);
    
    const resultCard = document.getElementById('resultCard');
    const statusText = document.getElementById('statusText');
    const maxMgDisplay = document.getElementById('maxMg');
    const currentMgDisplay = document.getElementById('currentMg');

    if (!weight || !amount) {
        alert("모든 빈칸을 채워주세요!");
        return;
    }

    const maxLimit = weight * 2.5; // 청소년 권장량 기준
    const consumed = caffeinePerMl * amount;

    // 결과 표시
    resultCard.classList.remove('hidden', 'safe', 'danger');
    maxMgDisplay.innerText = maxLimit.toFixed(1);
    currentMgDisplay.innerText = consumed.toFixed(1);

    if (consumed > maxLimit) {
        resultCard.classList.add('danger');
        statusText.innerHTML = "⚠️ <b>위험!</b> 권장량을 초과했습니다.<br>심장이 두근거리거나 잠이 안 올 수 있어요.";
    } else {
        resultCard.classList.add('safe');
        statusText.innerHTML = "✅ <b>양호!</b> 안전 범위 내에 있습니다.<br>적당한 수분 섭취를 유지하세요.";
    }
});