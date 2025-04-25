function checkSerial() {
  const input = document.getElementById("serialInput").value.trim();
  const resultDiv = document.getElementById("result");
  const timeNow = new Date().toLocaleTimeString("ar-EG");

  const found = shadowCurrency.find(item => item.serial === input);

  if (found) {
    resultDiv.innerHTML = `
      <p style="color: green;">العملة أصلية</p>
      <p>المالك: <strong>${found.owner}</strong></p>
      <p>الرتبة: ${found.rank}</p>
      <p>تاريخ الإصدار: ${found.issued}</p>
      <p>الوصف: ${found.description}</p>
      <p>الحالة: <strong>${found.status === "ثابتة" ? "العملة ثابتة ولا يمكن نقلها" : "العملة قابلة للتحويل إذا وجدت من يستحقها أكثر"}</strong></p>
      <p>آخر تعديل: ${found.lastUpdated}</p>
    `;
  } else {
    resultDiv.innerHTML = `<p style="color: red;">العملة مزورة أو غير مسجلة.</p>`;
  }

  document.getElementById("lastCheck").textContent = timeNow;
}

function searchByOwnerOrDescription() {
  const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultDiv = document.getElementById("result");
  
  const foundItems = shadowCurrency.filter(item => 
    item.owner.toLowerCase().includes(searchTerm) || 
    item.description.toLowerCase().includes(searchTerm)
  );

  if (foundItems.length > 0) {
    resultDiv.innerHTML = "<h3>نتائج البحث:</h3>";
    foundItems.forEach(item => {
      resultDiv.innerHTML += `
        <p>المالك: <strong>${item.owner}</strong>, الرتبة: ${item.rank}, الحالة: ${item.status}</p>
      `;
    });
  } else {
    resultDiv.innerHTML = `<p style="color: red;">لا توجد نتائج تطابق البحث.</p>`;
  }
}

function filterByStatus(status) {
  const resultDiv = document.getElementById("result");
  const filtered = shadowCurrency.filter(item => item.status === status);

  resultDiv.innerHTML = `<h3>العملات ${status === 'ثابتة' ? 'الثابتة' : 'القابلة للتحويل'}</h3>`;
  filtered.forEach(item => {
    resultDiv.innerHTML += `
      <p>المالك: <strong>${item.owner}</strong>, الرتبة: ${item.rank}</p>
    `;
  });
}

function filterByRank(rank) {
  const resultDiv = document.getElementById("result");
  const filtered = shadowCurrency.filter(item => item.rank === rank);

  resultDiv.innerHTML = `<h3>العملات الرتبة: ${rank}</h3>`;
  filtered.forEach(item => {
    resultDiv.innerHTML += `
      <p>المالك: <strong>${item.owner}</strong>, الحالة: ${item.status}</p>
    `;
  });
}

function toggleMode() {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
}
