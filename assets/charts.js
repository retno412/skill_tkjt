/**
 * SKILL_TKJT Chart Management Utility
 */
const CyberCharts = {
  renderRadarCompare: (canvasId, scoreSE, scoreNE) => {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const isDark = document.documentElement.classList.contains('dark');
    
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Software Engineering (SE)', 'Network & Telecom (JKT)'],
        datasets: [{
          label: 'Kecenderungan Skor (%)',
          data: [scoreSE, scoreNE],
          backgroundColor: [
            'rgba(59, 130, 246, 0.6)', // SE Blue
            'rgba(34, 211, 238, 0.6)'  // NE Cyan
          ],
          borderColor: [
            '#3b82f6',
            '#22d3ee'
          ],
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
            ticks: { color: isDark ? '#9ca3af' : '#475569' }
          },
          x: {
            grid: { display: false },
            ticks: { color: isDark ? '#9ca3af' : '#475569', font: { weight: 'bold' } }
          }
        }
      }
    });
  }
};