export async function fetchPortfolio() {
  const response=await fetch('/api/platform/public',{cache:'no-store',signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw new Error('Portföyler yüklenemedi. Lütfen tekrar deneyin veya bize ulaşın.');
  const data=await response.json();
  if(!Array.isArray(data.records))throw new Error('Portföy bilgisi alınamadı.');
  return data;
}
