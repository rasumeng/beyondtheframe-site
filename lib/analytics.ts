export function trackDownload(projectId: string, projectName: string): void {
  if (typeof window === 'undefined') return;
  
  const key = `btf_downloads_${projectId}`;
  const current = parseInt(localStorage.getItem(key) || '0');
  localStorage.setItem(key, (current + 1).toString());

  console.log(`[BTF Analytics] Download tracked: ${projectName} (total: ${current + 1})`);
}

export function getTotalDownloads(): number {
  if (typeof window === 'undefined') return 0;
  
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('btf_downloads_')) {
      total += parseInt(localStorage.getItem(key) || '0');
    }
  }
  return total;
}

export function getProjectDownloads(projectId: string): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem(`btf_downloads_${projectId}`) || '0');
}